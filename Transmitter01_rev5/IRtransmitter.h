#ifndef _IRTRANSMITTER_H_
#define _IRTRANSMITTER_H_
#include <arduino.h>

#define IR_PREAMBLE 0
#define IR_LOGIC_1 1
#define IR_LOGIC_0 2
#define IR_DOWNTIME 3

class Transmitter_IR
{
public:
  Transmitter_IR();
  void sendSignal(unsigned char signal[13]);
  void preamble();
  void logic1();
  void logic0();
  void downTime();
  void waitingTime();
  int getCounterOn(int Tipe);
  int getPeriod();
  void testSignal(unsigned long Timer);
  void setPin(int Pin);
  void setHex(int Hex);
  void setFlipHex(int flip);
  void setFlipSB(int flip);
  void setLastHalf(int value);
  void saveCurrentTemp(int value);
  void saveCurrentFan(int value);

  int getCurrentTemp();
  int getCurrentFan();

  int numHex();
  unsigned char flipHex(unsigned char signal_in);
  unsigned char flipSB(unsigned char signal_in);

  unsigned long _COUNTER_PREAMBLE_0 = 0;
  unsigned long _COUNTER_PREAMBLE_1 = 0;
  unsigned long _COUNTER_LOGIC_0 = 0;
  unsigned long _COUNTER_LOGIC_1 = 0;
  unsigned long _COUNTER_DOWNTIME = 0;
  unsigned long _WAITING_TIME = 0;
  unsigned long _T_IR = 0;
  unsigned long _ONE_CNT = _T_IR * 2;

private:
  int _current_temp;
  int _current_fan;

  int getPin();
  int cHexflip();
  int cSBflip();
  int clasthalf();

  int _Pin;
  int _num_hex;
  int _Hex_flip;
  int _SB_flip;
  int _last_half;
};

class AC_Sharp : public Transmitter_IR
{
public:
  AC_Sharp(int Pin);
  void setOn();
  void setOff();

  void setTemp(int temp);
  int currentTemp();
  void increaseTemp();
  void decreaseTemp();

  void setFan(int fan);
  int currentFan();
  void increaseFan();
  void decreaseFan();

  void setLinear(unsigned long recH, unsigned long recL, unsigned long sentH, unsigned long sentL);

private:
  int _Temp = 16;
  int _Fan = 0;
  unsigned char _signal_on[13];
  unsigned char _signal_off[13];
  unsigned char _signal_temp[13];
  unsigned char _signal_fan[13];

  unsigned char _temp_error[15];
  unsigned char _temp_hex[15];

  unsigned char _fan_error[4];
  unsigned char _fan_hex[4];

  const unsigned long FREQ_IR = 28000;
  const unsigned long T_IR = 1000000 / FREQ_IR;
  const unsigned long ONE_CNT = T_IR * 2;
  const unsigned long TIMER_ON_DEFAULT_LOW = 300;
  const unsigned long TIMER_ON_DEFAULT_HIGH = 5000;

  unsigned long TIMER_ON = 2000;
  unsigned long COUNTER_0 = TIMER_ON / ONE_CNT;
  unsigned long COUNTER_1 = TIMER_ON / ONE_CNT;
  unsigned long COUNTER_DOWN = TIMER_ON / ONE_CNT;
  unsigned long COUNTER_PREAMBLE = TIMER_ON / ONE_CNT;
  unsigned long COUNTER_WAIT_PREAMBLE = TIMER_ON / ONE_CNT;
  unsigned long TIMER_OFF = 1000;

  unsigned long _recL = 50;
  unsigned long _recH = 960;
  unsigned long _sentL = TIMER_ON_DEFAULT_LOW;
  unsigned long _sentH = TIMER_ON_DEFAULT_HIGH;
  const unsigned long _TARGET_1 = 290;
  const unsigned long _TARGET_0 = 80;
  const unsigned long _TARGET_DOWN = 100;
  const unsigned long _TARGET_PREAMBLE = 750;
  const unsigned long _TARGET_WAIT_PREAMBLE = 350;
};

class AC_LG : public Transmitter_IR
{
public:
  AC_LG(int Pin);
  void setOn();
  void setOff();

  void setTemp(int temp);
  int currentTemp();
  void increaseTemp();
  void decreaseTemp();

  void setFan(int fan);
  int currentFan();
  void increaseFan();
  void decreaseFan();

  unsigned char getCheck(unsigned char val1, unsigned char val2, unsigned char val3);

  void setLinear(unsigned long recH, unsigned long recL, unsigned long sentH, unsigned long sentL);
  void setParams();
  void setWaitingTime(unsigned long Timer);

private:
  int _Temp = 24;
  int _Fan = 3;
  unsigned char _signal_on[13];
  unsigned char _signal_off[13];
  unsigned char _signal[13];
  unsigned char _signal_temp[13];
  unsigned char _signal_fan[13];

  unsigned char _temp_error[15];
  unsigned char _temp_hex[15];

  unsigned char _fan_error[4];
  unsigned char _fan_hex[4];

  const unsigned long FREQ_IR = 28000;
  const unsigned long T_IR = 1000000 / FREQ_IR;
  const unsigned long ONE_CNT = T_IR * 2;
  const unsigned long TIMER_ON_DEFAULT_LOW = 300;
  const unsigned long TIMER_ON_DEFAULT_HIGH = 5000;

  unsigned long TIMER_ON = 2000;
  unsigned long COUNTER_0 = TIMER_ON / ONE_CNT;
  unsigned long COUNTER_1 = TIMER_ON / ONE_CNT;
  unsigned long COUNTER_DOWN = TIMER_ON / ONE_CNT;
  unsigned long COUNTER_PREAMBLE = TIMER_ON / ONE_CNT;
  unsigned long COUNTER_WAIT_PREAMBLE = TIMER_ON / ONE_CNT;
  unsigned long TIMER_OFF = 1000;

  unsigned long _recL = 50;
  unsigned long _recH = 960;
  unsigned long _sentL = TIMER_ON_DEFAULT_LOW;
  unsigned long _sentH = TIMER_ON_DEFAULT_HIGH;
  const unsigned long _TARGET_1 = 300;
  const unsigned long _TARGET_0 = 100;
  const unsigned long _TARGET_DOWN = 130;
  const unsigned long _TARGET_PREAMBLE = 1600;
  const unsigned long _TARGET_WAIT_PREAMBLE = 760;
};

#endif
