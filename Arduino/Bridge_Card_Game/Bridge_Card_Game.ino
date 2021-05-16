#include <SPI.h>
#include <RFID.h>

//Wifi
#include "ESP8266WiFi.h"
const char *ssid = "wifi";
const char *passw = "12345678";
#define host "192.168.1.38"
#define port 4000
String response;
float value;
String _str, _res;

//Rfid
#define SS_PIN D2
#define RST_PIN D1
RFID rfid(SS_PIN,RST_PIN);


String cardType; // รับ string
String serNum[5];  // เก็บค่า rfid tag

//Card C = Club , A = Diamond , S = Spade , H = Heart 
String C02[5] = {"118","125","238","9","236"};
String A02[5] = {"182","205","15","10","126"};
String H02[5] = {"86","223","42","10","169"};
String S02[5] = {"22","119","252","9","148"};
String C03[5] = {"118","7","245","9","141"};
String A03[5] = {"214","80","233","9","102"};
String H03[5] = {"86","151","238","9","38"};
String S03[5] = {"230","153","237","9","155"};
String C04[5] = {"102","36","244","9","191"};
String A04[5] = {"198","232","242","9","213"};
String H04[5] = {"6","59","245","9","193"};
String S04[5] = {"54","1","231","9","217"};
String C05[5] = {"54","230","244","9","45"};
String A05[5] = {"134","11","230","9","98"};
String H05[5] = {"182","238","244","9","165"};
String S05[5] = {"6","147","237","9","113"};
String C06[5] = {"22","111","9","10","122"};
String A06[5] = {"70","110","239","9","206"};
String H06[5] = {"118","160","231","9","56"};
String S06[5] = {"86","43","13","10","122"};
String C07[5] = {"86","71","244","9","236"};
String A07[5] = {"246","29","42","10","203"};
String H07[5] = {"198","198","244","9","253"};
String S07[5] = {"198","39","244","9","28"};
String C08[5] = {"102","195","231","9","75"};
String A08[5] = {"38","155","242","9","70"};
String H08[5] = {"246","4","11","10","243"};
String S08[5] = {"150","212","25","10","81"};
String C09[5] = {"22","232","242","9","5"};
String A09[5] = {"230","125","30","10","143"};
String H09[5] = {"118","108","233","9","250"};
String S09[5] = {"230","74","33","10","135"};
String C10[5] = {"214","176","238","9","129"};
String A10[5] = {"198","156","235","9","184"}; 
String H10[5] = {"54","194","13","10","243"};
String S10[5] = {"182","40","43","10","191"};
String C13[5] = {"214","17","234","9","36"};
String A13[5] = {"38","59","240","9","228"}; 
String H13[5] = {"182","82","18","10","252"};
String S13[5] = {"230","94","24","10","170"};
String C12[5] = {"246","32","245","9","42"};
String A12[5] = {"6","160","241","9","94"};
String H12[5] = {"102","203","241","9","85"};
String S12[5] = {"38","248","231","9","48"};
String C11[5] = {"214","223","238","9","238"};
String A11[5] = {"118","91","236","9","200"};
String H11[5] = {"198","217","235","9","253"}; 
String S11[5] = {"118","229","242","9","104"}; 
String C14[5] = {"134","91","252","9","40"}; 
String A14[5] = {"22","67","234","9","182"};
String H14[5] = {"6","80","46","10","114"};
String S14[5] = {"246","91","31","10","184"};


void setup() {
  Serial.begin(9600);
  WiFi.begin(ssid, passw);
  Serial.print("WiFi connecting.....");
  while ((WiFi.status() != WL_CONNECTED)) {
    delay(200);
    Serial.print(".");
  }
  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("Connected !");    
  }else{
    Serial.println("Disconnected !");
  }
  
  //Bulitin LED
  pinMode(LED_BUILTIN, OUTPUT); 
  
  //SPI RFID
  SPI.begin();
  rfid.init();
}

void loop() {
  if(rfid.isCard()) {
    if(rfid.readCardSerial()){
      for(int i =0; i<=4 ;i++){
        serNum[i] = rfid.serNum[i];
      }
    //  Serial.print("Cardnumber : ");
    //  printArray(serNum,4);
      changeValue();
      Serial.println("Card_Type : " + cardType);
      sendToExpress(cardType);
      delay(350);
    }
  }
}

void changeValue(){
if(serNum[0] == C14[0] && serNum[1] == C14[1] && serNum[2] == C14[2] && serNum[3] == C14[3]){ cardType = "C14";   }
if(serNum[0] == A14[0] && serNum[1] == A14[1] && serNum[2] == A14[2] && serNum[3] == A14[3]){ cardType = "A14";   }
if(serNum[0] == H14[0] && serNum[1] == H14[1] && serNum[2] == H14[2] && serNum[3] == H14[3]){ cardType = "H14";   }
if(serNum[0] == S14[0] && serNum[1] == S14[1] && serNum[2] == S14[2] && serNum[3] == S14[3]){ cardType = "S14";   }
if(serNum[0] == C02[0] && serNum[1] == C02[1] && serNum[2] == C02[2] && serNum[3] == C02[3]){ cardType = "C02";   }
if(serNum[0] == A02[0] && serNum[1] == A02[1] && serNum[2] == A02[2] && serNum[3] == A02[3]){ cardType = "A02";   }
if(serNum[0] == H02[0] && serNum[1] == H02[1] && serNum[2] == H02[2] && serNum[3] == H02[3]){ cardType = "H02";   }
if(serNum[0] == S02[0] && serNum[1] == S02[1] && serNum[2] == S02[2] && serNum[3] == S02[3]){ cardType = "S02";   }
if(serNum[0] == C03[0] && serNum[1] == C03[1] && serNum[2] == C03[2] && serNum[3] == C03[3]){ cardType = "C03";   }
if(serNum[0] == A03[0] && serNum[1] == A03[1] && serNum[2] == A03[2] && serNum[3] == A03[3]){ cardType = "A03";   }
if(serNum[0] == H03[0] && serNum[1] == H03[1] && serNum[2] == H03[2] && serNum[3] == H03[3]){ cardType = "H03";   }
if(serNum[0] == S03[0] && serNum[1] == S03[1] && serNum[2] == S03[2] && serNum[3] == S03[3]){ cardType = "S03";   }
if(serNum[0] == C04[0] && serNum[1] == C04[1] && serNum[2] == C04[2] && serNum[3] == C04[3]){ cardType = "C04";   }
if(serNum[0] == A04[0] && serNum[1] == A04[1] && serNum[2] == A04[2] && serNum[3] == A04[3]){ cardType = "A04";   }
if(serNum[0] == H04[0] && serNum[1] == H04[1] && serNum[2] == H04[2] && serNum[3] == H04[3]){ cardType = "H04";   }
if(serNum[0] == S04[0] && serNum[1] == S04[1] && serNum[2] == S04[2] && serNum[3] == S04[3]){ cardType = "S04";   }
if(serNum[0] == C05[0] && serNum[1] == C05[1] && serNum[2] == C05[2] && serNum[3] == C05[3]){ cardType = "C05";   }
if(serNum[0] == A05[0] && serNum[1] == A05[1] && serNum[2] == A05[2] && serNum[3] == A05[3]){ cardType = "A05";   }
if(serNum[0] == H05[0] && serNum[1] == H05[1] && serNum[2] == H05[2] && serNum[3] == H05[3]){ cardType = "H05";   }
if(serNum[0] == S05[0] && serNum[1] == S05[1] && serNum[2] == S05[2] && serNum[3] == S05[3]){ cardType = "S05";   }
if(serNum[0] == C06[0] && serNum[1] == C06[1] && serNum[2] == C06[2] && serNum[3] == C06[3]){ cardType = "C06";   }
if(serNum[0] == A06[0] && serNum[1] == A06[1] && serNum[2] == A06[2] && serNum[3] == A06[3]){ cardType = "A06";   }
if(serNum[0] == H06[0] && serNum[1] == H06[1] && serNum[2] == H06[2] && serNum[3] == H06[3]){ cardType = "H06";   }
if(serNum[0] == S06[0] && serNum[1] == S06[1] && serNum[2] == S06[2] && serNum[3] == S06[3]){ cardType = "S06";   }
if(serNum[0] == C07[0] && serNum[1] == C07[1] && serNum[2] == C07[2] && serNum[3] == C07[3]){ cardType = "C07";   }
if(serNum[0] == A07[0] && serNum[1] == A07[1] && serNum[2] == A07[2] && serNum[3] == A07[3]){ cardType = "A07";   }
if(serNum[0] == H07[0] && serNum[1] == H07[1] && serNum[2] == H07[2] && serNum[3] == H07[3]){ cardType = "H07";   }
if(serNum[0] == S07[0] && serNum[1] == S07[1] && serNum[2] == S07[2] && serNum[3] == S07[3]){ cardType = "S07";   }
if(serNum[0] == C08[0] && serNum[1] == C08[1] && serNum[2] == C08[2] && serNum[3] == C08[3]){ cardType = "C08";   }
if(serNum[0] == A08[0] && serNum[1] == A08[1] && serNum[2] == A08[2] && serNum[3] == A08[3]){ cardType = "A08";   }
if(serNum[0] == H08[0] && serNum[1] == H08[1] && serNum[2] == H08[2] && serNum[3] == H08[3]){ cardType = "H08";   }
if(serNum[0] == S08[0] && serNum[1] == S08[1] && serNum[2] == S08[2] && serNum[3] == S08[3]){ cardType = "S08";   }
if(serNum[0] == C09[0] && serNum[1] == C09[1] && serNum[2] == C09[2] && serNum[3] == C09[3]){ cardType = "C09";   }
if(serNum[0] == A09[0] && serNum[1] == A09[1] && serNum[2] == A09[2] && serNum[3] == A09[3]){ cardType = "A09";   }
if(serNum[0] == H09[0] && serNum[1] == H09[1] && serNum[2] == H09[2] && serNum[3] == H09[3]){ cardType = "H09";   }
if(serNum[0] == S09[0] && serNum[1] == S09[1] && serNum[2] == S09[2] && serNum[3] == S09[3]){ cardType = "S09";   }
if(serNum[0] == C10[0] && serNum[1] == C10[1] && serNum[2] == C10[2] && serNum[3] == C10[3]){ cardType = "C10";   }
if(serNum[0] == A10[0] && serNum[1] == A10[1] && serNum[2] == A10[2] && serNum[3] == A10[3]){ cardType = "A10";   }
if(serNum[0] == H10[0] && serNum[1] == H10[1] && serNum[2] == H10[2] && serNum[3] == H10[3]){ cardType = "H10";   }
if(serNum[0] == S10[0] && serNum[1] == S10[1] && serNum[2] == S10[2] && serNum[3] == S10[3]){ cardType = "S10";   }
if(serNum[0] == C11[0] && serNum[1] == C11[1] && serNum[2] == C11[2] && serNum[3] == C11[3]){ cardType = "C11";   }
if(serNum[0] == A11[0] && serNum[1] == A11[1] && serNum[2] == A11[2] && serNum[3] == A11[3]){ cardType = "A11";   }
if(serNum[0] == H11[0] && serNum[1] == H11[1] && serNum[2] == H11[2] && serNum[3] == H11[3]){ cardType = "H11";   }
if(serNum[0] == S11[0] && serNum[1] == S11[1] && serNum[2] == S11[2] && serNum[3] == S11[3]){ cardType = "S11";   }
if(serNum[0] == C12[0] && serNum[1] == C12[1] && serNum[2] == C12[2] && serNum[3] == C12[3]){ cardType = "C12";   }
if(serNum[0] == A12[0] && serNum[1] == A12[1] && serNum[2] == A12[2] && serNum[3] == A12[3]){ cardType = "A12";   }
if(serNum[0] == H12[0] && serNum[1] == H12[1] && serNum[2] == H12[2] && serNum[3] == H12[3]){ cardType = "H12";   }
if(serNum[0] == S12[0] && serNum[1] == S12[1] && serNum[2] == S12[2] && serNum[3] == S12[3]){ cardType = "S12";   }
if(serNum[0] == C13[0] && serNum[1] == C13[1] && serNum[2] == C13[2] && serNum[3] == C13[3]){ cardType = "C13";   }
if(serNum[0] == A13[0] && serNum[1] == A13[1] && serNum[2] == A13[2] && serNum[3] == A13[3]){ cardType = "A13";   }
if(serNum[0] == H13[0] && serNum[1] == H13[1] && serNum[2] == H13[2] && serNum[3] == H13[3]){ cardType = "H13";   }
if(serNum[0] == S13[0] && serNum[1] == S13[1] && serNum[2] == S13[2] && serNum[3] == S13[3]){ cardType = "S13";   }
}

void LED(){
  digitalWrite(LED_BUILTIN, HIGH);   // Turn the LED on by making the voltage LOW
  delay(100);                      // Wait for a second
  digitalWrite(LED_BUILTIN, LOW);  // Turn the LED off by making the voltage HIGH
}


String sendToExpress (String data) {
WiFiClient client;
  if (client.connect(host, port)) {
    _str = "GET /write/";
    _str += data;  
    _str += " HTTP/1.1\r\n";
    _str += "Host: ";
    _str += host;
    _str += ":";
    _str += port;
    _str += "\r\n";
    _str += "Connection: keep-alive\r\n\r\n";
    client.print(_str);
    delay(500);
    Serial.println("Send data complete.");
    while (client.available()) {
      _res = client.readStringUntil('\r');
    }
return _res;
  } else {
    //Nothing..
  }
}
  
