#include "IRtransmitter.h"
//#include <avr/io.h>

/***********************************************************************************/
//                       Parent Class : Transmitter IR                             //
/***********************************************************************************/

Transmitter_IR::Transmitter_IR()
{
}

int Transmitter_IR::getPin()
{
  return _Pin;
}

void Transmitter_IR::setPin(int Pin)
{
  _Pin = Pin;
}

void Transmitter_IR::setHex(int Hex)
{
  _num_hex = Hex;
}

int Transmitter_IR::numHex()
{
  return _num_hex;
}

void Transmitter_IR::preamble()
{
  int i = 0;
  while (i < _COUNTER_PREAMBLE_0)
  {
    digitalWrite(getPin(), HIGH);
    delayMicroseconds(_T_IR); //time = 35us
    digitalWrite(getPin(), LOW);
    delayMicroseconds(_T_IR); //time = 35us
    i++;
  }
  i = 0;
  while (i < _COUNTER_PREAMBLE_1)
  {
    digitalWrite(getPin(), LOW);
    delayMicroseconds(_T_IR); //time = 35us
    digitalWrite(getPin(), LOW);
    delayMicroseconds(_T_IR); //time = 35us
    i++;
  }
}

void Transmitter_IR::logic0()
{
  int i = 0;
  while (i < _COUNTER_LOGIC_0)
  {
    digitalWrite(getPin(), LOW);
    delayMicroseconds(_T_IR); //time = 35us
    digitalWrite(getPin(), LOW);
    delayMicroseconds(_T_IR); //time = 35us
    i++;
  }
}

void Transmitter_IR::logic1()
{
  int i = 0;
  while (i < _COUNTER_LOGIC_1)
  {
    digitalWrite(getPin(), LOW);
    delayMicroseconds(_T_IR); //time = 35us
    digitalWrite(getPin(), LOW);
    delayMicroseconds(_T_IR); //time = 35us
    i++;
  }
}

void Transmitter_IR::downTime()
{
  int i = 0;
  while (i < _COUNTER_DOWNTIME)
  {
    digitalWrite(getPin(), HIGH);
    delayMicroseconds(_T_IR); //time = 35us
    digitalWrite(getPin(), LOW);
    delayMicroseconds(_T_IR); //time = 35us
    i++;
  }
}

void Transmitter_IR::waitingTime()
{
  delay(_WAITING_TIME);
}

int Transmitter_IR::getCounterOn(int Tipe)
{
  if (Tipe == IR_PREAMBLE)
  {
    return _COUNTER_PREAMBLE_0;
  }
  else if (Tipe == IR_LOGIC_1)
  {
    return _COUNTER_LOGIC_1;
  }
  else if (Tipe == IR_LOGIC_0)
  {
    return _COUNTER_LOGIC_0;
  }
  else if (Tipe == IR_DOWNTIME)
  {
    return _COUNTER_DOWNTIME;
  }
  else
  {
    return -1;
  }
}

int Transmitter_IR::getPeriod()
{
  return _T_IR;
}

void Transmitter_IR::testSignal(unsigned long Timer)
{
  unsigned long local_counter = Timer / _ONE_CNT;
  int i = 0;
  while (i < local_counter)
  {
    digitalWrite(getPin(), HIGH);
    delayMicroseconds(_T_IR); //time = 35us
    digitalWrite(getPin(), LOW);
    delayMicroseconds(_T_IR); //time = 35us
    i++;
  }
}

void Transmitter_IR::sendSignal(unsigned char signal_in[13])
{
  preamble();
  downTime();
  for (int hex = 0; hex < numHex(); hex++)
  {
    if (cHexflip())
      signal_in[hex] = flipHex(signal_in[hex]);
    if (cSBflip())
      signal_in[hex] = flipSB(signal_in[hex]);
    for (int bit = 0; bit < 8; bit++)
    {
      unsigned char id = (signal_in[hex] & (1 << bit));
      if (id)
      {
        logic1();
        //Serial.print("1");
        downTime();
        //Serial.print("-");
      }
      else
      {
        if (clasthalf())
        {
          if (hex == (numHex() - 1) && bit > 3)
          {
            //dont do anything
            //hex=numHex();
          }
          else
          {
            logic0();
            //Serial.print("0");
            downTime();
            //Serial.print("-");
          }
        }
        else
        {
          logic0();
          //Serial.print("0");
          downTime();
          //Serial.print("-");
        }
      }
    }
  }
  waitingTime();
  //Serial.println();
}

unsigned char Transmitter_IR::flipHex(unsigned char signal)
{
  unsigned char buff = 0;
  //ex 0xCF = 1100 1111
  buff = signal >> 4;                     // 0000 1100
  buff = buff | ((signal << 4) & (0xF0)); //1111 0000
  //result : 1111 1100 = 0xFC
  return buff;
}

unsigned char Transmitter_IR::flipSB(unsigned char signal_in)
{
  unsigned char buff_flip = 0;
  //Serial.print("Buff After:");
  for (int i = 0; i < 8; i++)
  {
    if (signal_in & (1 << i))
    {
      buff_flip = (buff_flip | 1);
      //Serial.print("1");
    }
    else
    {
      buff_flip = (buff_flip | 0);
      //Serial.print("0");
    }
    if (i != 7)
      buff_flip = (buff_flip << 1);
  }
  // 0x53 = 01010011
  //Serial.println();
  //Serial.println(buff_flip,BIN);
  return buff_flip;
}

void Transmitter_IR::setFlipHex(int flip)
{
  _Hex_flip = flip;
}

void Transmitter_IR::setFlipSB(int flip)
{
  _SB_flip = flip;
}

void Transmitter_IR::setLastHalf(int value)
{
  _last_half = value;
}

int Transmitter_IR::cHexflip()
{
  return _Hex_flip;
}

int Transmitter_IR::cSBflip()
{
  return _SB_flip;
}

int Transmitter_IR::clasthalf()
{
  return _last_half;
}

void Transmitter_IR::saveCurrentTemp(int value)
{
  _current_temp = value;
}

void Transmitter_IR::saveCurrentFan(int value)
{
  _current_fan = value;
}

int Transmitter_IR::getCurrentTemp()
{
  return _current_temp;
}

int Transmitter_IR::getCurrentFan()
{
  return _current_fan;
}

/***********************************************************************************/
//                        Child Class : AC Sharp                                   //
/***********************************************************************************/

AC_Sharp::AC_Sharp(int Pin)
{
  pinMode(Pin, OUTPUT);
  digitalWrite(Pin, LOW);
  setPin(Pin);
  setHex(13);
  // default value;
  _signal_on[0] = 0xAA;
  _signal_on[1] = 0x5A;
  _signal_on[2] = 0xCF;
  _signal_on[3] = 0x10;
  _signal_on[4] = 0xCE; //T=29
  _signal_on[5] = 0x11; //on
  _signal_on[6] = 0x72; //Fan = 0
  _signal_on[7] = 0x00;
  _signal_on[8] = 0x08;
  _signal_on[9] = 0x80;
  _signal_on[10] = 0x00; //on-off key
  _signal_on[11] = 0xF0;
  _signal_on[12] = 0x41; //error check

  _signal_off[0] = 0xAA;
  _signal_off[1] = 0x5A;
  _signal_off[2] = 0xCF;
  _signal_off[3] = 0x10;
  _signal_off[4] = 0xCE; //T=29
  _signal_off[5] = 0x21; //off
  _signal_off[6] = 0x72; //Fan = 0
  _signal_off[7] = 0x00;
  _signal_off[8] = 0x08;
  _signal_off[9] = 0x80;
  _signal_off[10] = 0x00; //on-off key
  _signal_off[11] = 0xF0;
  _signal_off[12] = 0x71; //error check

  _signal_temp[0] = 0xAA;
  _signal_temp[1] = 0x5A;
  _signal_temp[2] = 0xCF;
  _signal_temp[3] = 0x10;
  _signal_temp[4] = 0xC7; //T=22
  _signal_temp[5] = 0x31; //idle
  _signal_temp[6] = 0x72; //Fan = 0
  _signal_temp[7] = 0x00;
  _signal_temp[8] = 0x08;
  _signal_temp[9] = 0x80;
  _signal_temp[10] = 0x04; //temp key
  _signal_temp[11] = 0xF0;
  _signal_temp[12] = 0xB1; //error check

  _signal_fan[0] = 0xAA;
  _signal_fan[1] = 0x5A;
  _signal_fan[2] = 0xCF;
  _signal_fan[3] = 0x10;
  _signal_fan[4] = 0xCB; //T=26
  _signal_fan[5] = 0x31; //idle
  _signal_fan[6] = 0x52; //Fan = 2
  _signal_fan[7] = 0x00;
  _signal_fan[8] = 0x08;
  _signal_fan[9] = 0x80;
  _signal_fan[10] = 0x05; //fan key
  _signal_fan[11] = 0xF0;
  _signal_fan[12] = 0x41; //error check

  _temp_error[0] = 0xD1;
  _temp_error[1] = 0xE1;
  _temp_error[2] = 0xF1;
  _temp_error[3] = 0x81;
  _temp_error[4] = 0x91;
  _temp_error[5] = 0xA1;
  _temp_error[6] = 0xB1;
  _temp_error[7] = 0xC1;
  _temp_error[8] = 0x51;
  _temp_error[9] = 0x61;
  _temp_error[10] = 0x71;
  _temp_error[11] = 0x01;
  _temp_error[12] = 0x11;
  _temp_error[13] = 0x21;
  _temp_error[14] = 0x31;

  _temp_hex[0] = 0xC1;
  _temp_hex[1] = 0xC2;
  _temp_hex[2] = 0xC3;
  _temp_hex[3] = 0xC4;
  _temp_hex[4] = 0xC5;
  _temp_hex[5] = 0xC6;
  _temp_hex[6] = 0xC7;
  _temp_hex[7] = 0xC8;
  _temp_hex[8] = 0xC9;
  _temp_hex[9] = 0xCA;
  _temp_hex[10] = 0xCB;
  _temp_hex[11] = 0xCC;
  _temp_hex[12] = 0xCD;
  _temp_hex[13] = 0xCE;
  _temp_hex[14] = 0xCF;

  _fan_hex[0] = 0x22;
  _fan_hex[1] = 0x32;
  _fan_hex[2] = 0x52;
  _fan_hex[3] = 0x72;

  _fan_error[0] = 0x31;
  _fan_error[1] = 0x21;
  _fan_error[2] = 0x41;
  _fan_error[3] = 0x61;
}

void AC_Sharp::setLinear(unsigned long recH, unsigned long recL, unsigned long sentH, unsigned long sentL)
{
  _recL = recL;
  _recH = recH;
  _sentL = sentL;
  _sentH = sentH;
  TIMER_ON = ((_TARGET_1 - _recL) * (_sentH - _sentL) / (_recH - _recL)) + _sentL;
  COUNTER_1 = TIMER_ON / ONE_CNT;
  TIMER_ON = ((_TARGET_0 - _recL) * (_sentH - _sentL) / (_recH - _recL)) + _sentL;
  COUNTER_0 = TIMER_ON / ONE_CNT;
  TIMER_ON = ((_TARGET_DOWN - _recL) * (_sentH - _sentL) / (_recH - _recL)) + _sentL;
  COUNTER_DOWN = TIMER_ON / ONE_CNT;
  TIMER_ON = ((_TARGET_PREAMBLE - _recL) * (_sentH - _sentL) / (_recH - _recL)) + _sentL;
  COUNTER_PREAMBLE = TIMER_ON / ONE_CNT;
  TIMER_ON = ((_TARGET_WAIT_PREAMBLE - _recL) * (_sentH - _sentL) / (_recH - _recL)) + _sentL;
  COUNTER_WAIT_PREAMBLE = TIMER_ON / ONE_CNT;
}

void AC_Sharp::setOn()
{
  sendSignal(_signal_on);
}

void AC_Sharp::setOff()
{
  sendSignal(_signal_off);
}

void AC_Sharp::setTemp(int temp)
{
  if (temp < 16)
    temp = 16;
  if (temp > 30)
    temp = 30;

  int index = temp - 16;
  _signal_temp[4] = _temp_hex[index];
  _signal_temp[12] = _temp_error[index];

  sendSignal(_signal_temp);
}

void AC_Sharp::setFan(int fan)
{
  if (fan < 0)
    fan = 0;
  if (fan > 3)
    fan = 3;

  int index = fan;
  _signal_fan[4] = _fan_hex[index];
  _signal_fan[12] = _fan_error[index];
  sendSignal(_signal_fan);
}

int AC_Sharp::currentTemp()
{
  int value = _signal_temp[4];
  value = value + 16;
  return value;
}

int AC_Sharp::currentFan()
{
  int value = _signal_fan[4];
  return value;
}

void AC_Sharp::increaseTemp()
{
  int value = currentTemp();
  value++;
  if (value > 30)
    value = 30;
  if (value < 16)
    value = 16;

  int index = value - 16;
  _signal_temp[4] = _temp_hex[index];
  _signal_temp[12] = _temp_error[index];
  sendSignal(_signal_temp);
}

void AC_Sharp::decreaseTemp()
{
  int value = currentTemp();
  value--;
  if (value > 30)
    value = 30;
  if (value < 16)
    value = 16;

  int index = value - 16;
  _signal_temp[4] = _temp_hex[index];
  _signal_temp[12] = _temp_error[index];
  sendSignal(_signal_temp);
}

void AC_Sharp::increaseFan()
{
  int value = currentFan();
  value++;
  if (value > 3)
    value = value % 4;

  int index = value;
  _signal_fan[4] = _fan_hex[index];
  _signal_fan[12] = _fan_error[index];
  sendSignal(_signal_fan);
}

void AC_Sharp::decreaseFan()
{
  int value = currentFan();
  if (value > 0)
  {
    value--;
  }
  else if (value == 0)
  {
    value = 3;
  }

  int index = value;
  _signal_fan[4] = _fan_hex[index];
  _signal_fan[12] = _fan_error[index];
  sendSignal(_signal_fan);
}

/***********************************************************************************/
//                           Child Class : AC LG                                   //
/***********************************************************************************/

AC_LG::AC_LG(int Pin)
{
  pinMode(Pin, OUTPUT);
  digitalWrite(Pin, LOW);
  setPin(Pin);
  setHex(4);
  setParams();
  setWaitingTime(2000);
  setFlipHex(0);
  setFlipSB(1);
  setLastHalf(1);
  // default value;

  _signal[0] = 0x88;
  _signal[1] = 0x08;
  _signal[2] = 0xA4; //T=25*C, Fan=3
  _signal[3] = 0x60;
}

void AC_LG::setLinear(unsigned long recH, unsigned long recL, unsigned long sentH, unsigned long sentL)
{
  _recL = recL;
  _recH = recH;
  _sentL = sentL;
  _sentH = sentH;
  TIMER_ON = ((_TARGET_1 - _recL) * (_sentH - _sentL) / (_recH - _recL)) + _sentL;
  COUNTER_1 = TIMER_ON / ONE_CNT;
  TIMER_ON = ((_TARGET_0 - _recL) * (_sentH - _sentL) / (_recH - _recL)) + _sentL;
  COUNTER_0 = TIMER_ON / ONE_CNT;
  TIMER_ON = ((_TARGET_DOWN - _recL) * (_sentH - _sentL) / (_recH - _recL)) + _sentL;
  COUNTER_DOWN = TIMER_ON / ONE_CNT;
  TIMER_ON = ((_TARGET_PREAMBLE - _recL) * (_sentH - _sentL) / (_recH - _recL)) + _sentL;
  COUNTER_PREAMBLE = TIMER_ON / ONE_CNT;
  TIMER_ON = ((_TARGET_WAIT_PREAMBLE - _recL) * (_sentH - _sentL) / (_recH - _recL)) + _sentL;
  COUNTER_WAIT_PREAMBLE = TIMER_ON / ONE_CNT;
  setParams();
}

void AC_LG::setParams()
{
  _COUNTER_PREAMBLE_0 = COUNTER_PREAMBLE;
  _COUNTER_PREAMBLE_1 = COUNTER_WAIT_PREAMBLE;
  _COUNTER_LOGIC_0 = COUNTER_0;
  _COUNTER_LOGIC_1 = COUNTER_1;
  _COUNTER_DOWNTIME = COUNTER_DOWN;
  _WAITING_TIME = TIMER_OFF;
  _T_IR = T_IR;
  _ONE_CNT = ONE_CNT;
}

void AC_LG::setWaitingTime(unsigned long Timer)
{
  _WAITING_TIME = Timer;
}

unsigned char AC_LG::getCheck(unsigned char val1, unsigned char val2, unsigned char val3)
{
  int val1_1 = (val1 & 0xF0) >> 4;
  int val1_2 = (val1 & 0x0F) >> 0;
  int val2_1 = (val2 & 0xF0) >> 4;
  int val2_2 = (val2 & 0x0F) >> 0;
  int val3_1 = (val3 & 0xF0) >> 4;
  int val3_2 = (val3 & 0x0F) >> 0;
  int sum_e = val1_1 + val1_2 + val2_1 + val2_2 + val3_1 + val3_2;
  unsigned char check_value = sum_e % 16;
  check_value = (check_value << 4) & 0xF0;
  return check_value;
}

void AC_LG::setOn()
{
  _signal_on[0] = 0x88;
  _signal_on[1] = 0x00;
  _signal_on[2] = 0x94; //T=24*C, Fan=3
  _signal_on[3] = 0xD0;
  saveCurrentTemp(24);
  sendSignal(_signal_on);
}

void AC_LG::setOff()
{
  _signal_off[0] = 0x88;
  _signal_off[1] = 0xC0;
  _signal_off[2] = 0x05;
  _signal_off[3] = 0x10;
  saveCurrentTemp(24);
  sendSignal(_signal_off);
}

void AC_LG::setTemp(int temp)
{
  if (temp > 30)
    temp = 30;
  if (temp < 18)
    temp = 18;
  int fan = currentFan();
  int hex_temp = temp - 15;
  int hex_fan = 0;
  switch (fan)
  {
  case 0:
    hex_fan = 5;
    break;
  case 1:
    hex_fan = 0;
    break;
  case 2:
    hex_fan = 2;
    break;
  case 3:
    hex_fan = 4;
    break;
  }
  _signal[0] = 0x88;
  _signal[1] = 0x08;
  _signal[2] = ((hex_temp << 4) & 0xF0);
  _signal[2] |= ((hex_fan << 0) & 0x0F);
  _signal[3] = getCheck(_signal[0], _signal[1], _signal[2]);
  saveCurrentTemp(temp);
  saveCurrentFan(currentFan());
  sendSignal(_signal);
}

void AC_LG::setFan(int fan)
{
  if (fan > 3)
    fan = 3;
  if (fan < 0)
    fan = 0;
  int hex_temp = currentTemp() - 15;
  int hex_fan = fan;
  switch (fan)
  {
  case 0:
    hex_fan = 5;
    break;
  case 1:
    hex_fan = 0;
    break;
  case 2:
    hex_fan = 2;
    break;
  case 3:
    hex_fan = 4;
    break;
  }
  _signal[0] = 0x88;
  _signal[1] = 0x08;
  _signal[2] = ((hex_temp << 4) & 0xF0);
  _signal[2] |= ((hex_fan << 0) & 0x0F);
  _signal[3] = getCheck(_signal[0], _signal[1], _signal[2]);
  saveCurrentTemp(currentTemp());
  saveCurrentFan(fan);
  sendSignal(_signal);
}

int AC_LG::currentTemp()
{
  return getCurrentTemp();
}

int AC_LG::currentFan()
{
  return getCurrentFan();
}

void AC_LG::increaseTemp()
{
  int value = currentTemp();
  value++;
  if (value > 30)
    value = 30;
  if (value < 18)
    value = 16;

  setTemp(value);
}

void AC_LG::decreaseTemp()
{
  int value = currentTemp();
  value--;
  if (value > 30)
    value = 30;
  if (value < 18)
    value = 16;

  setTemp(value);
}

void AC_LG::increaseFan()
{
  int value = currentFan();
  value++;
  if (value > 3)
    value = value % 4;

  setFan(value);
}

void AC_LG::decreaseFan()
{
  int value = currentFan();
  if (value > 0)
  {
    value--;
  }
  else if (value == 0)
  {
    value = 3;
  }

  setFan(value);
}
