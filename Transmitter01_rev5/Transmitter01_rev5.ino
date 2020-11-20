#include <Wire.h>
#include <Alfriza_Modbus_RTU.h>
#include "IRtransmitter.h"
#include "Adafruit_MCP9808.h"

AC_LG LG(30);
ModbusRTU Modbus_RTU(0x30);
Adafruit_MCP9808 tempsensor1 = Adafruit_MCP9808();
Adafruit_MCP9808 tempsensor2 = Adafruit_MCP9808();

byte buffer[1];
byte serial_buffer[256];
int serial_cnt = 0;

char react_buffer[256];
char react_char;
char react_function;
int react_cnt = 0;

boolean react_flag_di = false;
boolean react_flag_di_x12 = false;
boolean react_flag_di_x13 = false;
boolean react_flag_di_x14 = false;
boolean react_flag_di_x15 = false;
boolean react_flag_di_x16 = false;
boolean react_flag_di_x17 = false;
boolean react_flag_di_x18 = false;

unsigned long recH = 1050;
unsigned long recL = 45;
unsigned long sentH = 5000;
unsigned long sentL = 200;

struct Data_Master_Str
{
  int status_on;
  float temperatur_adjusted;
  float fan_adjusted;
  float temperatur_actual_1;
  float temperatur_actual_2;
  float humidity_actual;
  float current_RMS;
  float current_peak;
  int status_relay;
};

struct Data_Master_Str Data;

int increase_temp = 0;
int decrease_temp = 0;
int increase_fan = 0;
int decrease_fan = 0;
int set_on = 0;
int set_off = 0;
int relay_on = 0;

short temp_actual_1;
short temp_actual_2;
short temp_adjusted;
short fan_adjusted;
short current_peak;
short current_RMS;
short humidity_actual;
short status_on;
short status_relay;

unsigned char byte_1_temp_actual_1;
unsigned char byte_2_temp_actual_1;
unsigned char byte_1_temp_actual_2;
unsigned char byte_2_temp_actual_2;
unsigned char byte_1_temp_adjusted;
unsigned char byte_2_temp_adjusted;
unsigned char byte_1_fan_adjusted;

unsigned char byte_1_current_peak;
unsigned char byte_2_current_peak;
unsigned char byte_1_current_RMS;
unsigned char byte_2_current_RMS;
unsigned char byte_1_humidity_actual;
unsigned char byte_2_humidity_actual;
unsigned char byte_1_status_on;
unsigned char byte_1_status_relay;

void getSerialCurrentData()
{
  Serial1.write(0x11);
  delay(100);
  if (Serial1.available())
  {
    while (Serial1.readBytes((byte *)buffer, 1))
    {
      serial_buffer[serial_cnt] = buffer[0];
      serial_cnt++;
      Serial1.setTimeout(100);
    }
    unsigned short PP_int = 0;
    unsigned short RMS_int = 0;
    PP_int = serial_buffer[0];
    PP_int = PP_int | (serial_buffer[1] << 8);
    RMS_int = serial_buffer[2];
    RMS_int = RMS_int | (serial_buffer[3] << 8);

    float PP = PP_int / 1000.0;
    float RMS = RMS_int / 1000.0;

    Data.current_peak = PP;
    Data.current_RMS = RMS;
    if (Data.current_RMS > 0.2)
    {
      Data.status_on = 1;
    }
    else
    {
      Data.status_on = 0;
    }
    serial_cnt = 0;
    buffer[0] = 0;
  }
}

void setup()
{
  // put your setup code here, to run once:
  Serial.begin(115200);
  Serial1.begin(115200);
  pinMode(40, INPUT);
  pinMode(41, INPUT);
  pinMode(46, INPUT);
  pinMode(47, INPUT);
  pinMode(48, INPUT);
  pinMode(49, INPUT);
  pinMode(31, OUTPUT);
  digitalWrite(31, HIGH);
  //TIMER_ON = TIMER_ON_DEFAULT_LOW;
  //TIMER_ON = TIMER_ON_DEFAULT_HIGH;
  LG.setLinear(recH, recL, sentH, sentL);

  if (!tempsensor1.begin(0x19))
  {
    //Serial.println("Couldn't find MCP9808 1! Check your connections and verify the address is correct.");
  }
  if (!tempsensor2.begin(0x18))
  {
    //Serial.println("Couldn't find MCP9808 2! Check your connections and verify the address is correct.");
  }

  Data.status_on = 0;
  Data.temperatur_adjusted = 24;
  Data.temperatur_actual_1 = 24;
  Data.temperatur_actual_2 = 24;
  Data.fan_adjusted = 3;
  Data.humidity_actual = 80;
  Data.current_peak = 0;
  Data.current_RMS = 0;
  Data.status_relay = 0;

  delay(1000);
}

void loop()
{

  //********************************************************************//
  //                       MODBUS RTU HMI Wonderware                    //
  //********************************************************************//
  /*
  if (Serial.available()>0){
    Modbus_RTU.tagRegisterAI(1,Data.temperatur_actual_1*100);
    Modbus_RTU.tagRegisterAI(2,Data.temperatur_actual_2*100);
    Modbus_RTU.tagRegisterAI(3,Data.temperatur_adjusted*100);
    Modbus_RTU.tagRegisterAI(4,Data.fan_adjusted);
    Modbus_RTU.tagRegisterAI(5,Data.current_peak*100);
    Modbus_RTU.tagRegisterAI(6,Data.current_RMS*100);
    Modbus_RTU.tagRegisterAI(7,Data.humidity_actual*100);
    Modbus_RTU.tagRegisterDI(1,Data.status_on);
    
    Modbus_RTU.listenQuery();
    Modbus_RTU.sendResponse();

    relay_on = Modbus_RTU.tagRegisterDO(1);
    set_on = Modbus_RTU.tagRegisterDO(2);
    set_off = Modbus_RTU.tagRegisterDO(3);
    increase_temp = Modbus_RTU.tagRegisterDO(4);
    decrease_temp = Modbus_RTU.tagRegisterDO(5);
    increase_fan = Modbus_RTU.tagRegisterDO(6);
    decrease_fan = Modbus_RTU.tagRegisterDO(7);
  }
  */

  //********************************************************************//
  //                       React-based Website                          //
  //********************************************************************//
  if (Serial.available() > 0)
  {
    react_char = Serial.read();
    react_buffer[0] = react_char;

    switch (react_char)
    {
      case 0x11:
        temp_actual_1 = Data.temperatur_actual_1 * 100;
        temp_actual_2 = Data.temperatur_actual_2 * 100;
        temp_adjusted = Data.temperatur_adjusted * 100;
        fan_adjusted = Data.fan_adjusted;
        current_peak = Data.current_peak * 100;
        current_RMS = Data.current_RMS * 100;
        humidity_actual = Data.humidity_actual * 100;
        status_on = Data.status_on;
        status_relay = Data.status_relay;

        byte_1_temp_actual_1 = ((temp_actual_1 & 0x00FF) >> 0);
        byte_2_temp_actual_1 = ((temp_actual_1 & 0xFF00) >> 8);
        byte_1_temp_actual_2 = ((temp_actual_2 & 0x00FF) >> 0);
        byte_2_temp_actual_2 = ((temp_actual_2 & 0xFF00) >> 8);
        byte_1_temp_adjusted = ((temp_adjusted & 0x00FF) >> 0);
        byte_2_temp_adjusted = ((temp_adjusted & 0xFF00) >> 8);
        byte_1_fan_adjusted = ((fan_adjusted & 0x00FF) >> 0);

        byte_1_current_peak = ((current_peak & 0x00FF) >> 0);
        byte_2_current_peak = ((current_peak & 0xFF00) >> 8);
        byte_1_current_RMS = ((current_RMS & 0x00FF) >> 0);
        byte_2_current_RMS = ((current_RMS & 0xFF00) >> 8);
        byte_1_humidity_actual = ((humidity_actual & 0x00FF) >> 0);
        byte_2_humidity_actual = ((humidity_actual & 0xFF00) >> 8);
        byte_1_status_on = ((status_on & 0x00FF) >> 0);
        byte_1_status_relay = ((status_relay & 0x00FF) >> 0);

        Serial.write(0x11);        
        Serial.write(byte_1_temp_actual_1);
        Serial.write(byte_2_temp_actual_1);
        Serial.write(byte_1_temp_actual_2);
        Serial.write(byte_2_temp_actual_2);
        Serial.write(byte_1_temp_adjusted);
        Serial.write(byte_1_temp_adjusted);
        Serial.write(byte_1_fan_adjusted);
        Serial.write(byte_1_current_peak);
        Serial.write(byte_2_current_peak);
        Serial.write(byte_1_current_RMS);
        Serial.write(byte_2_current_RMS);
        Serial.write(byte_1_humidity_actual);
        Serial.write(byte_2_humidity_actual);
        Serial.write(byte_1_status_on);
        Serial.write(byte_1_status_relay);
        //delay(100);
      break;
    case 0x12:
      react_flag_di_x12 = !react_flag_di_x12;
      if (!react_flag_di_x12) increase_temp = react_buffer[1];
      break;
    case 0x13:
      react_flag_di_x13 = !react_flag_di_x13;
      if (!react_flag_di_x13) decrease_temp = react_buffer[1];
      break;
    case 0x14:
      react_flag_di_x14 = !react_flag_di_x14;
      if (!react_flag_di_x14) increase_fan = react_buffer[1];
      break;
    case 0x15:
      react_flag_di_x15 = !react_flag_di_x15;
      if (!react_flag_di_x15) decrease_fan = react_buffer[1];
      break;
    case 0x16:
      react_flag_di_x16 = !react_flag_di_x16;
      if (!react_flag_di_x16) set_on = react_buffer[1];
      break;
    case 0x17:
      react_flag_di_x17 = !react_flag_di_x17;
      if (!react_flag_di_x17) set_off = react_buffer[1];
      break;
    case 0x18:
      react_flag_di_x18 = !react_flag_di_x18;
      if (!react_flag_di_x18) relay_on = react_buffer[1];
      break;
    default:
      if (react_flag_di_x12 || react_flag_di_x13 || react_flag_di_x14 || react_flag_di_x15 || react_flag_di_x16 || react_flag_di_x17 || react_flag_di_x18)
        react_buffer[1] = react_char;
      //Serial.write(react_buffer[0]);
      //Serial.write(react_buffer[1]);
      break;
    }

    react_cnt = 0;
    buffer[0] = 0;
  }

  tempsensor1.wake(); // wake up, ready to read!
  tempsensor1.getResolution();
  Data.temperatur_actual_1 = tempsensor1.readTempC();
  tempsensor1.shutdown_wake(1);

  tempsensor2.wake(); // wake up, ready to read!
  tempsensor2.getResolution();
  Data.temperatur_actual_2 = tempsensor2.readTempC();
  tempsensor2.shutdown_wake(1);

  if ((digitalRead(46) == 1) || set_on)
  {
    LG.setOn();
    Data.temperatur_adjusted = LG.currentTemp();
    Data.fan_adjusted = LG.currentFan();
    //set_on = 0;
  }

  if ((digitalRead(47) == 1) || set_off)
  {
    LG.setOff();
    //set_off = 0;
  }

  if (digitalRead(48) == 1 || increase_temp)
  {
    LG.increaseTemp();
    Serial.println(LG.currentTemp());
    Data.temperatur_adjusted = LG.currentTemp();
    Data.fan_adjusted = LG.currentFan();
    //increase_temp = 0;
  }

  if (digitalRead(49) == 1 || decrease_temp)
  {
    LG.decreaseTemp();
    Serial.println(LG.currentTemp());
    Data.temperatur_adjusted = LG.currentTemp();
    Data.fan_adjusted = LG.currentFan();
    //decrease_temp = 0;
  }

  if (digitalRead(40) == 1 || relay_on)
  {
    digitalWrite(31, LOW);
    //relay_on = 0;
    Data.status_relay = 1;
  }
  else
  {
    digitalWrite(31, HIGH);
    Data.status_relay = 0;
  }

  getSerialCurrentData();
}
