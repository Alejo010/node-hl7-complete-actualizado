# Node HL7 Complete updated 2024

Node module that is bridged with the Java Hapi HL7 library.

With this library, you can:
- Transform plain JavaScript objects into HL7 messages.
- Transform HL7 messages into plain JavaScript objects.
- Benefit from Java Hapi HL7 being used under the hood, with much coverage e.x.: ADT, BAR, DFT, MDM, MFN, ORM, ORU, QRY, RAS, RDE, RGV, SIU, etc...

## Overview
This HL7 solution works by making calls to the Java Hapi HL7 library under the hood. Hapi is the gold-standard implementation of HL7 parsing.

## Project Dependencies
When this project started, many folks were using Java 8. Unfortunately, the Java dependencies in this project relies on that version to function. While it is a major inconvenience to downgrade your Java version, you may find success with [Jabba](https://github.com/shyiko/jabba) to manage your version (simiar to rvm, nvm, etc).

In addition, version 3.1.0 and above of this project expects your Node version to be greater than 12. Check out [Node Version Manager](https://github.com/nvm-sh/nvm) to manage versions.

## Installation and use
For this project to work, you only need to have a node version equal to or greater than 20.11.0 and JDK 1.8 for 64 bits.
It is recommended to use Java_Development_Kit_(64bit)_v8 Update 391, installed in the path C:\Program Files\Java, if necessary configure your environment variables.

## update 2024
## Use and compatibility update 2024

The version of its dependencies was updated with small modifications to the json, and its most important dependency went from java0.12.1 to java0.14.0.
It currently works with JAVA 8 and its tests were carried out with Java_Development_Kit_(64bit)_v8 Update 391
Keep in mind that for the development of this library, it may be necessary to have C/C++ tools installed on the PC.


##Usage example
```
const NodeHL7Complete = require('./index');

// Create an instance of the module
const hl7Converter = new NodeHL7Complete();

// Example HL7 message
//const hl7Message = 'MSH|^~\\&|SENDING_APP|SENDING_FACILITY|RECEIVING_APP|RECEIVING_FACILITY|20210622120000||ADT^A01|123456789|P|2.3|||';
let hl7Message = '';
hl7Message += 'MSH|^~\\&|||||||VXU^V04|19970522MA53|P|2.3.1|||AL\r';
hl7Message += 'PID|||221345671^^^^SS||KENNEDY^JOHN^FITZGERALD^JR|BOUVIER^^^^^^M|19900607|M|||^^^^MA^^^BLD\r ';
hl7Message += 'NK1|1|KENNEDY^JACQUELINE^LEE|32^MOTHER^HL70063\r';
hl7Message += 'RXA|0|1|19900607|19900607|08^HEPB-PEDIATRIC/ADOLESCENT^CVX|.5|ML^^ISO+||||||||MRK12345||MSD^MERCK^MVX\r' ;

// Convert HL7 message to JavaScript object
hl7Converter.hl7ToJs(hl7Message, (error, jsObject) => {
   if (error) {
     console.error('Error converting HL7 message to JavaScript object:', error);
   } else {
     console.log('HL7 message converted to JavaScript object:', jsObject);

     // Add this console.log to see the returned JSON object
     console.log('JSON object returned:', JSON.stringify(jsObject, null, 2));
   }
});
 ```
```

... these two `console.log`s yield the following:

```text
HL7 message converted to JavaScript object: {
   VXU_V04: {
     MSH: [[Object]],
     PID: [[Object]],
     NK1: [[Object]],
     'VXU_V04.ORCRXARXROBXNTE': [ [Object] ]
   }
}
JSON object returned: {
   "VXU_V04": {
     "MSH": [
       {
         "MSH.1": [
           "|"
         ],
         "MSH.2": [
           "^~\\&"
         ],
         "MSH.9": [
           {
             "MSG.1": [
               "VXU"
             ],
             "MSG.2": [
               "V04"
             ]
           }
         ],
         "MSH.10": [
           "19970522MA53"
         ],
         "MSH.11": [
           {
             "PT.1": [
               "P"
             ]
           }
         ],
         "MSH.12": [
           {
             "VID.1": [
               "2.3.1"
             ]
           }
         ],
         "MSH.15": [
           "TO THE"
         ]
       }
     ],
     "PID": [
       {
         "PID.3": [
           {
             "CX.1": [
               "221345671"
             ],
             "CX.5": [
               "H.H"
             ]
           }
         ],
         "PID.5": [
           {
             "XPN.1": [
               {
                 "FN.1": [
                   "KENNEDY"
                 ]
               }
             ],
             "XPN.2": [
               "JOHN"
             ],
             "XPN.3": [
               "FITZGERALD"
             ],
             "XPN.4": [
               "J.R."
             ]
           }
         ],
         "PID.6": [
           {
             "XPN.1": [
               {
                 "FN.1": [
                   "BOUVIER"
                 ]
               }
             ],
             "XPN.7": [
               "M"
             ]
           }
         ],
         "PID.7": [
           {
             "TS.1": [
               "19900607"
             ]
           }
         ],
         "PID.8": [
           "M"
         ],
         "PID.11": [
           {
             "XAD.5": [
               "MA"
             ],
             "XAD.8": [
               "BLD"
             ]
           }
         ]
       }
     ],
     "NK1": [
       {
         "NK1.1": [
           "1"
         ],
         "NK1.2": [
           {
             "XPN.1": [
               {
                 "FN.1": [
                   "KENNEDY"
                 ]
               }
             ],
             "XPN.2": [
               "JACQUELINE"
             ],
             "XPN.3": [
               "READ"
             ]
           }
         ],
         "NK1.3": [
           {
             "CE.1": [
               "32"
             ],
             "CE.2": [
               "MOTHER"
             ],
             "CE.3": [
               "HL70063"
             ]
           }
         ]
       }
     ],
     "VXU_V04.ORCRXARXROBXNTE": [
       {
         "RXA": [
           {
             "RXA.1": [
               "0"
             ],
             "RXA.2": [
               "1"
             ],
             "RXA.3": [
               {
                 "TS.1": [
                   "19900607"
                 ]
               }
             ],
             "RXA.4": [
               {
                 "TS.1": [
                   "19900607"
                 ]
               }
             ],
             "RXA.5": [
               {
                 "CE.1": [
                   "08"
                 ],
                 "CE.2": [
                   "HEPB-PEDIATRIC/ADOLESCENT"
                 ],
                 "CE.3": [
                   "CVX"
                 ]
               }
             ],
             "RXA.6": [
               ".5"
             ],
             "RXA.7": [
               {
                 "CE.1": [
                   "ML"
                 ],
                 "CE.3": [
                   "ISO+"
                 ]
               }
             ],
             "RXA.15": [
               "MRK12345"
             ],
             "RXA.17": [
               {
                 "CE.1": [
                   "MSD"
                 ],
                 "CE.2": [
                   "MERCK"
                 ],
                 "CE.3": [
                   "MVX"
                 ]
               }
             ]
           }
         ]
       }
     ]
   }
}
```

**Docker Solution**

This project also offers a Docker solution that will completely abstract away the Java 8 dependency. The container runs a server with 2 simple endpoints that match what would be used in the programmatic context. See "Running with Docker" a bit below.

## Example 1

```javascript
var NodeHL7Complete = require('node-hl7-complete');
var nodeHL7Instance = new NodeHL7Complete();

// Stolen from http://www.dt7.com/cdc/sampmsgs.html
var hl7Message = '';
hl7Message += 'MSH|^~\\&|||||||VXU^V04|19970522MA53|P|2.3.1|||AL\r';
hl7Message += 'PID|||221345671^^^^SS||KENNEDY^JOHN^FITZGERALD^JR|BOUVIER^^^^^^M|19900607|M|||^^^^MA^^^BLD\r';
hl7Message += 'NK1|1|KENNEDY^JACQUELINE^LEE|32^MOTHER^HL70063\r';
hl7Message += 'RXA|0|1|19900607|19900607|08^HEPB-PEDIATRIC/ADOLESCENT^CVX|.5|ML^^ISO+||||||||MRK12345||MSD^MERCK^MVX\r';

nodeHL7Instance.hl7ToJs(hl7Message, function(error, data) {
  if (error) { console.error(error); return; }

  console.log(data);
});

var jsData = {
  'VXU_V04': {
    'MSH': {
      'MSH.1': '|',
      'MSH.2': '^~\\&',
      'MSH.9': {
        'MSG.1': 'VXU',
        'MSG.2': 'V04'
      },
      'MSH.10': '19970522MA53',
      'MSH.11': {
        'PT.1': 'P'
      },
      'MSH.12': {
        'VID.1': '2.3.1'
      },
      'MSH.15': 'AL'
    },
    'PID': {
      'PID.3': {
        'CX.1': 221345671,
        'CX.5': 'SS'
      },
      'PID.5': {
        'XPN.1': {
          'FN.1': 'KENNEDY'
        },
        'XPN.2': 'JOHN',
        'XPN.3': 'FITZGERALD',
        'XPN.4': 'JR'
      },
      'PID.6': {
        'XPN.1': {
          'FN.1': 'BOUVIER'
        },
        'XPN.7': 'M'
      },
      'PID.7': {
        'TS.1': 19900607
      },
      'PID.8': 'M',
      'PID.11': {
        'XAD.5': 'MA',
        'XAD.8': 'BLD'
      }
    },
    'NK1': {
      'NK1.1': 1,
      'NK1.2': {
        'XPN.1': {
          'FN.1': 'KENNEDY'
        },
        'XPN.2': 'JACQUELINE',
        'XPN.3': 'LEE'
      },
      'NK1.3': {
        'CE.1': 32,
        'CE.2': 'MOTHER',
        'CE.3': 'HL70063'
      }
    },
    'VXU_V04.ORCRXARXROBXNTE': {
      'RXA': {
        'RXA.1': 0,
        'RXA.2': 1,
        'RXA.3': {
          'TS.1': 19900607
        },
        'RXA.4': {
          'TS.1': 19900607
        },
        'RXA.5': {
          'CE.1': 08,
          'CE.2': 'HEPB-PEDIATRIC/ADOLESCENT',
          'CE.3': 'CVX'
        },
        'RXA.6': 0.5,
        'RXA.7': {
          'CE.1': 'ML',
          'CE.3': 'ISO+'
        },
        'RXA.15': 'MRK12345',
        'RXA.17': {
          'CE.1': 'MSD',
          'CE.2': 'MERCK',
          'CE.3': 'MVX'
        }
      }
    }
  }
};

nodeHL7Instance.jsToHl7('VXU_V04', jsData, function(error, data) {
  if (error) { console.error(error); return; }

  console.log(data.split('\r').join('\n'));
});

```

... these two `console.log`s yield the following:

```text
MSH|^~\&|||||||VXU^V04|19970522MA53|P|2.3.1|||AL
PID|||221345671^^^^SS||KENNEDY^JOHN^FITZGERALD^JR|BOUVIER^^^^^^M|19900607|M|||^^^^MA^^^BLD
NK1|1|KENNEDY^JACQUELINE^LEE|32^MOTHER^HL70063
RXA|0|1|19900607|19900607|8^HEPB-PEDIATRIC/ADOLESCENT^CVX|0.5|ML^^ISO+||||||||MRK12345||MSD^MERCK^MVX

{ VXU_V04:
   { MSH: [ [Object] ],
     PID: [ [Object] ],
     NK1: [ [Object] ],
     'VXU_V04.ORCRXARXROBXNTE': [ [Object] ] } }
```

As far as data-integrity goes, see the following graphic to see what the original HL7 message looked like and what the transformed JS->HL7 message looks like (very small diff):

![img](diff.png)
 


## Strict Mode

By default, all HL7-to-JS messages will be validated for correctness. If you are receiving HL7 messages that are somewhat valid and wish to skip validation, you can use `nodeHL7Instance.setStrictMode(false)`.

## Running with Docker

1. clone this repo
2. `cd docker`
3. `docker build -t hl7_docker .`
4. `docker run -dp 8000:8000 hl7_docker`
5. `cd examples`
6. HL7->JSON test call: `./hl7ToJson.sh`
7. JSON->HL7 test call: `./jsonToHl7.sh`


Note: Outside of PM2, you may wish to use a more formal process manager solution.


## Notes
 - JavaScript keys _must_ be in quotes because 'PID.3', for example, cannot be used in dot-notation.
 - The first argument to `NodeHL7Complete.jsToHl7` must be the root XML node name. For example `VXU_V04`.
 - `MSH` segment must be escaped like so `^~\\&`
 - The Java layer is strictly speaking HL7 and XML... XML is converted to JavaScript objects in the `index.js` file. Was getting a ton of exceptions when trying to bring in `GSON`. It appears that Hapi is really best used with plain XML for now.
 - Segments must have `\r` at the end of them.
 - If an `error` is returned, it will be the Java exception.
 - The `node-java` module is what embeds Java and does the bridge work. Really cool.
 - Functional test HL7 data was found by Googling around. Credit is applied by the name of the folder holding the test data files. Cerner/NIST/Realm test data was provided by https://github.com/ruby-hl7/ruby-hl7/tree/master/test_data.
 - `workingDir` must be passed in when requiring the module because the java dependencies have to be absolutely referenced.


## Tests
- `> npm run unit_tests`
- `> npm run functional_tests`

...unit test coverage reports live in `coverage/`.

## TODOs
- Test on Windows.
- Add `.gitignore` for all of the Spring Tool Suite/Eclipse/Intellij files as well as NPM files.
- Quiet down the warnings on the Java side (logging stuff).
- Implicitly determine the root XML node name instead of passing it in as the first argument to `NodeHL7Complete.jsToHl7`.
- Look into ways to get around the `^~\\&` escaping.
- Figure out how to make Travis CI run the functional tests even though it is specified to be a node environment and doesn't have Java installed at the moment.

## License
MIT
