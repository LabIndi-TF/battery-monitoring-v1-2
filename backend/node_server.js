/*
RUN DENGAN:
node --max_old_space_size=1024 node_server.js
*/

/************************** Import library/fungsi ****************************/
//library serialport
var serialport = require('serialport');

//library untuk server tempat buffer serta koneksi mysql
const express = require('express');

//library yang memperbolehkan CORS
const cors = require('cors');

//library untuk (format) timestamp
var moment  = require('moment');

/************************ Deklarasi objek/variabel ***************************/
// variabel default
var ConfigDefault = [
    {
        DEVICE_NAME: 'Device 1',
        DEVICE_VISIBLE: true,
        DEVICE_INDEX: 1,
        GROUPTAG_LIST: [
            {
                GROUPTAG_NAME: 'Temperatur',
                GROUPTAG_VISIBLE: true,
                GROUPTAG_INDEX: 1,
                GROUPTAG_PLOTCONFIG: {
                    X_AXIS_SPAN: 10,
                    X_AXIS_UNIT: 'secs',
                    X_AXIS_SAMPLEPERSPAN: 10,
                    X_AXIS_NUMBERDIV: 10,
                    X_AXIS_LABEL:'X Axis',
                    Y_AXIS_TYPE: 'EU',
                    Y_AXIS_MINVAL: 0,
                    Y_AXIS_MAXVAL: 32,
                    Y_AXIS_NUMBERDIV: 10,
                    Y_AXIS_LABEL:'Y Axis',
                },
                TAG_LIST: [
                    {
                        TAG_NAME: 'Temp Adjusted',
                        TAG_VISIBLE: true,
                        TAG_DATASOURCE: 'arduino',
                        TAG_INDEX: 2,
                        TAG_MINVAL: 15,
                        TAG_MAXVAL: 32,
                        TAG_MINEU: 15,
                        TAG_MAXEU: 32,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Temp Actual 1',
                        TAG_VISIBLE: true,
                        TAG_DATASOURCE: 'arduino',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 15,
                        TAG_MAXVAL: 32,
                        TAG_MINEU: 15,
                        TAG_MAXEU: 32,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Temp Actual 2',
                        TAG_VISIBLE: true,
                        TAG_DATASOURCE: 'arduino',
                        TAG_INDEX: 1,
                        TAG_MINVAL: 15,
                        TAG_MAXVAL: 32,
                        TAG_MINEU: 15,
                        TAG_MAXEU: 32,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 4',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 5',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 6',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 7',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 8',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                ],
                IO_LIST: {
                    DI: [
                        {
                            DI_LABEL: "Relay ON/OFF",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "Set On",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "Set Off",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "Inc. Temp",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "Dec. Temp",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "Inc Fan",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "Dec Fan",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D1_G1_DI_8",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                    ],
                    AI: [
                        {
                            AI_LABEL: "A1_G1_AI_1",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A1_G1_AI_2",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A1_G1_AI_3",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A1_G1_AI_4",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A1_G1_AI_5",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A1_G1_AI_6",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A1_G1_AI_7",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A1_G1_AI_8",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                    ],
                },
            },
            {
                GROUPTAG_NAME: 'Arus',
                GROUPTAG_VISIBLE: true,
                GROUPTAG_INDEX: 2,
                GROUPTAG_PLOTCONFIG: {
                    X_AXIS_SPAN: 10,
                    X_AXIS_UNIT: 'secs',
                    X_AXIS_SAMPLEPERSPAN: 10,
                    X_AXIS_NUMBERDIV: 10,
                    X_AXIS_LABEL:'X Axis',
                    Y_AXIS_TYPE: 'EU',
                    Y_AXIS_MINVAL: 0,
                    Y_AXIS_MAXVAL: 2,
                    Y_AXIS_NUMBERDIV: 10,
                    Y_AXIS_LABEL:'Y Axis',
                },
                TAG_LIST: [
                    {
                        TAG_NAME: 'Arus Peak',
                        TAG_VISIBLE: true,
                        TAG_DATASOURCE: 'arduino',
                        TAG_INDEX: 4,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 2,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 2,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Arus RMS',
                        TAG_VISIBLE: true,
                        TAG_DATASOURCE: 'arduino',
                        TAG_INDEX: 5,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 2,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 2,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 3',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 2,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 2,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 4',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 5',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 6',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 7',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 8',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                ],
                IO_LIST: {
                    DI: [
                        {
                            DI_LABEL: "D1_G2_DI_1",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D1_G2_DI_2",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D1_G2_DI_3",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D1_G2_DI_4",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D1_G2_DI_5",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D1_G2_DI_6",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D1_G2_DI_7",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D1_G2_DI_8",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                    ],
                    AI: [
                        {
                            AI_LABEL: "A1_G2_AI_1",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A1_G2_AI_2",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A1_G2_AI_3",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A1_G2_AI_4",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A1_G2_AI_5",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A1_G2_AI_6",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A1_G2_AI_7",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A1_G2_AI_8",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                    ],
                },
            },
            {
                GROUPTAG_NAME: 'Status',
                GROUPTAG_VISIBLE: true,
                GROUPTAG_INDEX: 3,
                GROUPTAG_PLOTCONFIG: {
                    X_AXIS_SPAN: 10,
                    X_AXIS_UNIT: 'secs',
                    X_AXIS_SAMPLEPERSPAN: 10,
                    X_AXIS_NUMBERDIV: 10,
                    X_AXIS_LABEL:'X Axis',
                    Y_AXIS_TYPE: 'EU',
                    Y_AXIS_MINVAL: 0,
                    Y_AXIS_MAXVAL: 2,
                    Y_AXIS_NUMBERDIV: 10,
                    Y_AXIS_LABEL:'Y Axis',
                },
                TAG_LIST: [
                    {
                        TAG_NAME: 'Relay On',
                        TAG_VISIBLE: true,
                        TAG_DATASOURCE: 'arduino',
                        TAG_INDEX: 8,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 2,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 2,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Status On',
                        TAG_VISIBLE: true,
                        TAG_DATASOURCE: 'arduino',
                        TAG_INDEX: 7,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 2,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 2,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 3',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 4',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 5',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 6',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 7',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 8',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                ],
                IO_LIST: {
                    DI: [
                        {
                            DI_LABEL: "D1_G3_DI_1",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D1_G3_DI_2",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D1_G3_DI_3",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D1_G3_DI_4",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D1_G3_DI_5",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D1_G3_DI_6",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D1_G3_DI_7",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D1_G3_DI_8",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                    ],
                    AI: [
                        {
                            AI_LABEL: "A1_G3_AI_1",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A1_G3_AI_2",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A1_G3_AI_3",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A1_G3_AI_4",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A1_G3_AI_5",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A1_G3_AI_6",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A1_G3_AI_7",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A1_G3_AI_8",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                    ],
                },
            },
            {
                GROUPTAG_NAME: 'Group Tag 1D',
                GROUPTAG_VISIBLE: false,
                GROUPTAG_INDEX: 4,
                GROUPTAG_PLOTCONFIG: {
                    X_AXIS_SPAN: 10,
                    X_AXIS_UNIT: 'secs',
                    X_AXIS_SAMPLEPERSPAN: 10,
                    X_AXIS_NUMBERDIV: 10,
                    X_AXIS_LABEL:'X Axis',
                    Y_AXIS_TYPE: 'EU',
                    Y_AXIS_MINVAL: 0,
                    Y_AXIS_MAXVAL: 65535,
                    Y_AXIS_NUMBERDIV: 10,
                    Y_AXIS_LABEL:'Y Axis',
                },
                TAG_LIST: [
                    {
                        TAG_NAME: 'Tag 1',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 2',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 3',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 4',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 5',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 6',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 7',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 8',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                ],
                IO_LIST: {
                    DI: [
                        {
                            DI_LABEL: "D1_G4_DI_1",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D1_G4_DI_2",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D1_G4_DI_3",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D1_G4_DI_4",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D1_G4_DI_5",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D1_G4_DI_6",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D1_G4_DI_7",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D1_G4_DI_8",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                    ],
                    AI: [
                        {
                            AI_LABEL: "A1_G4_AI_1",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A1_G4_AI_2",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A1_G4_AI_3",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A1_G4_AI_4",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A1_G4_AI_5",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A1_G4_AI_6",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A1_G4_AI_7",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A1_G4_AI_8",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                    ],
                },
            },
            {
                GROUPTAG_NAME: 'Group Tag 1E',
                GROUPTAG_VISIBLE: false,
                GROUPTAG_INDEX: 5,
                GROUPTAG_PLOTCONFIG: {
                    X_AXIS_SPAN: 10,
                    X_AXIS_UNIT: 'secs',
                    X_AXIS_SAMPLEPERSPAN: 10,
                    X_AXIS_NUMBERDIV: 10,
                    X_AXIS_LABEL:'X Axis',
                    Y_AXIS_TYPE: 'EU',
                    Y_AXIS_MINVAL: 0,
                    Y_AXIS_MAXVAL: 65535,
                    Y_AXIS_NUMBERDIV: 10,
                    Y_AXIS_LABEL:'Y Axis',
                },
                TAG_LIST: [
                    {
                        TAG_NAME: 'Tag 1',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 2',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 3',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 4',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 5',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 6',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 7',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 8',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                ],
                IO_LIST: {
                    DI: [
                        {
                            DI_LABEL: "D1_G5_DI_1",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D1_G5_DI_2",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D1_G5_DI_3",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D1_G5_DI_4",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D1_G5_DI_5",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D1_G5_DI_6",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D1_G5_DI_7",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D1_G5_DI_8",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                    ],
                    AI: [
                        {
                            AI_LABEL: "A1_G5_AI_1",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A1_G5_AI_2",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A1_G5_AI_3",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A1_G5_AI_4",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A1_G5_AI_5",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A1_G5_AI_6",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A1_G5_AI_7",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A1_G5_AI_8",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                    ],
                },
            },
            {
                GROUPTAG_NAME: 'Group Tag 1F',
                GROUPTAG_VISIBLE: false,
                GROUPTAG_INDEX: 6,
                GROUPTAG_PLOTCONFIG: {
                    X_AXIS_SPAN: 10,
                    X_AXIS_UNIT: 'secs',
                    X_AXIS_SAMPLEPERSPAN: 10,
                    X_AXIS_NUMBERDIV: 10,
                    X_AXIS_LABEL:'X Axis',
                    Y_AXIS_TYPE: 'EU',
                    Y_AXIS_MINVAL: 0,
                    Y_AXIS_MAXVAL: 65535,
                    Y_AXIS_NUMBERDIV: 10,
                    Y_AXIS_LABEL:'Y Axis',
                },
                TAG_LIST: [
                    {
                        TAG_NAME: 'Tag 1',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 2',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 3',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 4',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 5',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 6',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 7',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 8',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                ],
                IO_LIST: {
                    DI: [
                        {
                            DI_LABEL: "D1_G6_DI_1",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D1_G6_DI_2",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D1_G6_DI_3",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D1_G6_DI_4",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D1_G6_DI_5",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D1_G6_DI_6",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D1_G6_DI_7",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D1_G6_DI_8",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                    ],
                    AI: [
                        {
                            AI_LABEL: "A1_G6_AI_1",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A1_G6_AI_2",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A1_G6_AI_3",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A1_G6_AI_4",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A1_G6_AI_5",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A1_G6_AI_6",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A1_G6_AI_7",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A1_G6_AI_8",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                    ],
                },
            },
            {
                GROUPTAG_NAME: 'Group Tag 1G',
                GROUPTAG_VISIBLE: false,
                GROUPTAG_INDEX: 7,
                GROUPTAG_PLOTCONFIG: {
                    X_AXIS_SPAN: 10,
                    X_AXIS_UNIT: 'secs',
                    X_AXIS_SAMPLEPERSPAN: 10,
                    X_AXIS_NUMBERDIV: 10,
                    X_AXIS_LABEL:'X Axis',
                    Y_AXIS_TYPE: 'EU',
                    Y_AXIS_MINVAL: 0,
                    Y_AXIS_MAXVAL: 65535,
                    Y_AXIS_NUMBERDIV: 10,
                    Y_AXIS_LABEL:'Y Axis',
                },
                TAG_LIST: [
                    {
                        TAG_NAME: 'Tag 1',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 2',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 3',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 4',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 5',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 6',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 7',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 8',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                ],
                IO_LIST: {
                    DI: [
                        {
                            DI_LABEL: "D1_G7_DI_1",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D1_G7_DI_2",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D1_G7_DI_3",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D1_G7_DI_4",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D1_G7_DI_5",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D1_G7_DI_6",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D1_G7_DI_7",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D1_G7_DI_8",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                    ],
                    AI: [
                        {
                            AI_LABEL: "A1_G7_AI_1",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A1_G7_AI_2",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A1_G7_AI_3",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A1_G7_AI_4",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A1_G7_AI_5",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A1_G7_AI_6",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A1_G7_AI_7",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A1_G7_AI_8",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                    ],
                },
            },
            {
                GROUPTAG_NAME: 'Group Tag 1H',
                GROUPTAG_VISIBLE: false,
                GROUPTAG_INDEX: 8,
                GROUPTAG_PLOTCONFIG: {
                    X_AXIS_SPAN: 10,
                    X_AXIS_UNIT: 'secs',
                    X_AXIS_SAMPLEPERSPAN: 10,
                    X_AXIS_NUMBERDIV: 10,
                    X_AXIS_LABEL:'X Axis',
                    Y_AXIS_TYPE: 'EU',
                    Y_AXIS_MINVAL: 0,
                    Y_AXIS_MAXVAL: 65535,
                    Y_AXIS_NUMBERDIV: 10,
                    Y_AXIS_LABEL:'Y Axis',
                },
                TAG_LIST: [
                    {
                        TAG_NAME: 'Tag 1',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 2',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 3',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 4',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 5',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 6',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 7',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 8',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                ],
                IO_LIST: {
                    DI: [
                        {
                            DI_LABEL: "D1_G8_DI_1",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D1_G8_DI_2",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D1_G8_DI_3",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D1_G8_DI_4",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D1_G8_DI_5",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D1_G8_DI_6",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D1_G8_DI_7",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D1_G8_DI_8",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                    ],
                    AI: [
                        {
                            AI_LABEL: "A1_G8_AI_1",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A1_G8_AI_2",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A1_G8_AI_3",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A1_G8_AI_4",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A1_G8_AI_5",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A1_G8_AI_6",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A1_G8_AI_7",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A1_G8_AI_8",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                    ],
                },
            },
        ]
    },
    {
        DEVICE_NAME: 'Device 2',
        DEVICE_VISIBLE: true,
        DEVICE_INDEX: 2,
        GROUPTAG_LIST: [
            {
                GROUPTAG_NAME: 'Group Tag 2A',
                GROUPTAG_VISIBLE: false,
                GROUPTAG_INDEX: 1,
                GROUPTAG_PLOTCONFIG: {
                    X_AXIS_SPAN: 10,
                    X_AXIS_UNIT: 'secs',
                    X_AXIS_SAMPLEPERSPAN: 10,
                    X_AXIS_NUMBERDIV: 10,
                    X_AXIS_LABEL:'X Axis',
                    Y_AXIS_TYPE: 'EU',
                    Y_AXIS_MINVAL: 0,
                    Y_AXIS_MAXVAL: 65535,
                    Y_AXIS_NUMBERDIV: 10,
                    Y_AXIS_LABEL:'Y Axis',
                },
                TAG_LIST: [
                    {
                        TAG_NAME: 'Tag 1',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 2',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 3',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 4',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 5',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 6',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 7',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 8',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                ],
                IO_LIST: {
                    DI: [
                        {
                            DI_LABEL: "D2_G1_DI_1",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D2_G1_DI_2",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D2_G1_DI_3",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D2_G1_DI_4",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D2_G1_DI_5",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D2_G1_DI_6",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D2_G1_DI_7",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D2_G1_DI_8",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                    ],
                    AI: [
                        {
                            AI_LABEL: "A2_G1_AI_1",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A2_G1_AI_2",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A2_G1_AI_3",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A2_G1_AI_4",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A2_G1_AI_5",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A2_G1_AI_6",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A2_G1_AI_7",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A2_G1_AI_8",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                    ],
                },
            },
            {
                GROUPTAG_NAME: 'Group Tag 2B',
                GROUPTAG_VISIBLE: false,
                GROUPTAG_INDEX: 2,
                GROUPTAG_PLOTCONFIG: {
                    X_AXIS_SPAN: 10,
                    X_AXIS_UNIT: 'secs',
                    X_AXIS_SAMPLEPERSPAN: 10,
                    X_AXIS_NUMBERDIV: 10,
                    X_AXIS_LABEL:'X Axis',
                    Y_AXIS_TYPE: 'EU',
                    Y_AXIS_MINVAL: 0,
                    Y_AXIS_MAXVAL: 65535,
                    Y_AXIS_NUMBERDIV: 10,
                    Y_AXIS_LABEL:'Y Axis',
                },
                TAG_LIST: [
                    {
                        TAG_NAME: 'Tag 1',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 2',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 3',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 4',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 5',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 6',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 7',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 8',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                ],
                IO_LIST: {
                    DI: [
                        {
                            DI_LABEL: "D2_G2_DI_1",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D2_G2_DI_2",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D2_G2_DI_3",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D2_G2_DI_4",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D2_G2_DI_5",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D2_G2_DI_6",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D2_G2_DI_7",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D2_G2_DI_8",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                    ],
                    AI: [
                        {
                            AI_LABEL: "A2_G2_AI_1",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A2_G2_AI_2",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A2_G2_AI_3",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A2_G2_AI_4",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A2_G2_AI_5",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A2_G2_AI_6",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A2_G2_AI_7",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A2_G2_AI_8",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                    ],
                },
            },
            {
                GROUPTAG_NAME: 'Group Tag 2C',
                GROUPTAG_VISIBLE: false,
                GROUPTAG_INDEX: 3,
                GROUPTAG_PLOTCONFIG: {
                    X_AXIS_SPAN: 10,
                    X_AXIS_UNIT: 'secs',
                    X_AXIS_SAMPLEPERSPAN: 10,
                    X_AXIS_NUMBERDIV: 10,
                    X_AXIS_LABEL:'X Axis',
                    Y_AXIS_TYPE: 'EU',
                    Y_AXIS_MINVAL: 0,
                    Y_AXIS_MAXVAL: 65535,
                    Y_AXIS_NUMBERDIV: 10,
                    Y_AXIS_LABEL:'Y Axis',
                },
                TAG_LIST: [
                    {
                        TAG_NAME: 'Tag 1',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 2',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 3',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 4',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 5',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 6',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 7',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 8',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                ],
                IO_LIST: {
                    DI: [
                        {
                            DI_LABEL: "D2_G3_DI_1",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D2_G3_DI_2",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D2_G3_DI_3",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D2_G3_DI_4",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D2_G3_DI_5",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D2_G3_DI_6",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D2_G3_DI_7",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D2_G3_DI_8",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                    ],
                    AI: [
                        {
                            AI_LABEL: "A2_G3_AI_1",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A2_G3_AI_2",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A2_G3_AI_3",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A2_G3_AI_4",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A2_G3_AI_5",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A2_G3_AI_6",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A2_G3_AI_7",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A2_G3_AI_8",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                    ],
                },
            },
            {
                GROUPTAG_NAME: 'Group Tag 2D',
                GROUPTAG_VISIBLE: false,
                GROUPTAG_INDEX: 4,
                GROUPTAG_PLOTCONFIG: {
                    X_AXIS_SPAN: 10,
                    X_AXIS_UNIT: 'secs',
                    X_AXIS_SAMPLEPERSPAN: 10,
                    X_AXIS_NUMBERDIV: 10,
                    X_AXIS_LABEL:'X Axis',
                    Y_AXIS_TYPE: 'EU',
                    Y_AXIS_MINVAL: 0,
                    Y_AXIS_MAXVAL: 65535,
                    Y_AXIS_NUMBERDIV: 10,
                    Y_AXIS_LABEL:'Y Axis',
                },
                TAG_LIST: [
                    {
                        TAG_NAME: 'Tag 1',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 2',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 3',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 4',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 5',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 6',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 7',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 8',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                ],
                IO_LIST: {
                    DI: [
                        {
                            DI_LABEL: "D2_G4_DI_1",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D2_G4_DI_2",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D2_G4_DI_3",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D2_G4_DI_4",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D2_G4_DI_5",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D2_G4_DI_6",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D2_G4_DI_7",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D2_G4_DI_8",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                    ],
                    AI: [
                        {
                            AI_LABEL: "A2_G4_AI_1",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A2_G4_AI_2",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A2_G4_AI_3",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A2_G4_AI_4",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A2_G4_AI_5",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A2_G4_AI_6",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A2_G4_AI_7",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A2_G4_AI_8",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                    ],
                },
            },
            {
                GROUPTAG_NAME: 'Group Tag 2E',
                GROUPTAG_VISIBLE: false,
                GROUPTAG_INDEX: 5,
                GROUPTAG_PLOTCONFIG: {
                    X_AXIS_SPAN: 10,
                    X_AXIS_UNIT: 'secs',
                    X_AXIS_SAMPLEPERSPAN: 10,
                    X_AXIS_NUMBERDIV: 10,
                    X_AXIS_LABEL:'X Axis',
                    Y_AXIS_TYPE: 'EU',
                    Y_AXIS_MINVAL: 0,
                    Y_AXIS_MAXVAL: 65535,
                    Y_AXIS_NUMBERDIV: 10,
                    Y_AXIS_LABEL:'Y Axis',
                },
                TAG_LIST: [
                    {
                        TAG_NAME: 'Tag 1',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 2',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 3',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 4',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 5',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 6',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 7',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 8',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                ],
                IO_LIST: {
                    DI: [
                        {
                            DI_LABEL: "D2_G5_DI_1",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D2_G5_DI_2",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D2_G5_DI_3",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D2_G5_DI_4",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D2_G5_DI_5",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D2_G5_DI_6",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D2_G5_DI_7",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D2_G5_DI_8",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                    ],
                    AI: [
                        {
                            AI_LABEL: "A2_G5_AI_1",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A2_G5_AI_2",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A2_G5_AI_3",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A2_G5_AI_4",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A2_G5_AI_5",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A2_G5_AI_6",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A2_G5_AI_7",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A2_G5_AI_8",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                    ],
                },
            },
            {
                GROUPTAG_NAME: 'Group Tag 2F',
                GROUPTAG_VISIBLE: false,
                GROUPTAG_INDEX: 6,
                GROUPTAG_PLOTCONFIG: {
                    X_AXIS_SPAN: 10,
                    X_AXIS_UNIT: 'secs',
                    X_AXIS_SAMPLEPERSPAN: 10,
                    X_AXIS_NUMBERDIV: 10,
                    X_AXIS_LABEL:'X Axis',
                    Y_AXIS_TYPE: 'EU',
                    Y_AXIS_MINVAL: 0,
                    Y_AXIS_MAXVAL: 65535,
                    Y_AXIS_NUMBERDIV: 10,
                    Y_AXIS_LABEL:'Y Axis',
                },
                TAG_LIST: [
                    {
                        TAG_NAME: 'Tag 1',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 2',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 3',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 4',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 5',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 6',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 7',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 8',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                ],
                IO_LIST: {
                    DI: [
                        {
                            DI_LABEL: "D2_G6_DI_1",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D2_G6_DI_2",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D2_G6_DI_3",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D2_G6_DI_4",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D2_G6_DI_5",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D2_G6_DI_6",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D2_G6_DI_7",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D2_G6_DI_8",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                    ],
                    AI: [
                        {
                            AI_LABEL: "A2_G6_AI_1",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A2_G6_AI_2",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A2_G6_AI_3",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A2_G6_AI_4",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A2_G6_AI_5",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A2_G6_AI_6",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A2_G6_AI_7",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A2_G6_AI_8",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                    ],
                },
            },
            {
                GROUPTAG_NAME: 'Group Tag 2G',
                GROUPTAG_VISIBLE: false,
                GROUPTAG_INDEX: 7,
                GROUPTAG_PLOTCONFIG: {
                    X_AXIS_SPAN: 10,
                    X_AXIS_UNIT: 'secs',
                    X_AXIS_SAMPLEPERSPAN: 10,
                    X_AXIS_NUMBERDIV: 10,
                    X_AXIS_LABEL:'X Axis',
                    Y_AXIS_TYPE: 'EU',
                    Y_AXIS_MINVAL: 0,
                    Y_AXIS_MAXVAL: 65535,
                    Y_AXIS_NUMBERDIV: 10,
                    Y_AXIS_LABEL:'Y Axis',
                },
                TAG_LIST: [
                    {
                        TAG_NAME: 'Tag 1',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 2',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 3',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 4',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 5',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 6',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 7',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 8',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                ],
                IO_LIST: {
                    DI: [
                        {
                            DI_LABEL: "D2_G7_DI_1",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D2_G7_DI_2",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D2_G7_DI_3",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D2_G7_DI_4",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D2_G7_DI_5",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D2_G7_DI_6",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D2_G7_DI_7",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D2_G7_DI_8",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                    ],
                    AI: [
                        {
                            AI_LABEL: "A2_G7_AI_1",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A2_G7_AI_2",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A2_G7_AI_3",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A2_G7_AI_4",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A2_G7_AI_5",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A2_G7_AI_6",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A2_G7_AI_7",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A2_G7_AI_8",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                    ],
                },
            },
            {
                GROUPTAG_NAME: 'Group Tag 2H',
                GROUPTAG_VISIBLE: false,
                GROUPTAG_INDEX: 8,
                GROUPTAG_PLOTCONFIG: {
                    X_AXIS_SPAN: 10,
                    X_AXIS_UNIT: 'secs',
                    X_AXIS_SAMPLEPERSPAN: 10,
                    X_AXIS_NUMBERDIV: 10,
                    X_AXIS_LABEL:'X Axis',
                    Y_AXIS_TYPE: 'EU',
                    Y_AXIS_MINVAL: 0,
                    Y_AXIS_MAXVAL: 65535,
                    Y_AXIS_NUMBERDIV: 10,
                    Y_AXIS_LABEL:'Y Axis',
                },
                TAG_LIST: [
                    {
                        TAG_NAME: 'Tag 1',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 2',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 3',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 4',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 5',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 6',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 7',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 8',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                ],
                IO_LIST: {
                    DI: [
                        {
                            DI_LABEL: "D2_G8_DI_1",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D2_G8_DI_2",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D2_G8_DI_3",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D2_G8_DI_4",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D2_G8_DI_5",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D2_G8_DI_6",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D2_G8_DI_7",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D2_G8_DI_8",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                    ],
                    AI: [
                        {
                            AI_LABEL: "A2_G8_AI_1",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A2_G8_AI_2",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A2_G8_AI_3",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A2_G8_AI_4",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A2_G8_AI_5",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A2_G8_AI_6",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A2_G8_AI_7",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A2_G8_AI_8",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                    ],
                },
            },
        ]
    },
    {
        DEVICE_NAME: 'Device 3',
        DEVICE_VISIBLE: true,
        DEVICE_INDEX: 3,
        GROUPTAG_LIST: [
            {
                GROUPTAG_NAME: 'Group Tag 3A',
                GROUPTAG_VISIBLE: false,
                GROUPTAG_INDEX: 1,
                GROUPTAG_PLOTCONFIG: {
                    X_AXIS_SPAN: 10,
                    X_AXIS_UNIT: 'secs',
                    X_AXIS_SAMPLEPERSPAN: 10,
                    X_AXIS_NUMBERDIV: 10,
                    X_AXIS_LABEL:'X Axis',
                    Y_AXIS_TYPE: 'EU',
                    Y_AXIS_MINVAL: 0,
                    Y_AXIS_MAXVAL: 65535,
                    Y_AXIS_NUMBERDIV: 10,
                    Y_AXIS_LABEL:'Y Axis',
                },
                TAG_LIST: [
                    {
                        TAG_NAME: 'Tag 1',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 2',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 3',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 4',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 5',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 6',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 7',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 8',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                ],
                IO_LIST: {
                    DI: [
                        {
                            DI_LABEL: "D3_G1_DI_1",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D3_G1_DI_2",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D3_G1_DI_3",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D3_G1_DI_4",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D3_G1_DI_5",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D3_G1_DI_6",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D3_G1_DI_7",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D3_G1_DI_8",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                    ],
                    AI: [
                        {
                            AI_LABEL: "A3_G1_AI_1",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A3_G1_AI_2",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A3_G1_AI_3",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A3_G1_AI_4",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A3_G1_AI_5",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A3_G1_AI_6",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A3_G1_AI_7",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A3_G1_AI_8",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                    ],
                },
            },
            {
                GROUPTAG_NAME: 'Group Tag 3B',
                GROUPTAG_VISIBLE: false,
                GROUPTAG_INDEX: 2,
                GROUPTAG_PLOTCONFIG: {
                    X_AXIS_SPAN: 10,
                    X_AXIS_UNIT: 'secs',
                    X_AXIS_SAMPLEPERSPAN: 10,
                    X_AXIS_NUMBERDIV: 10,
                    X_AXIS_LABEL:'X Axis',
                    Y_AXIS_TYPE: 'EU',
                    Y_AXIS_MINVAL: 0,
                    Y_AXIS_MAXVAL: 65535,
                    Y_AXIS_NUMBERDIV: 10,
                    Y_AXIS_LABEL:'Y Axis',
                },
                TAG_LIST: [
                    {
                        TAG_NAME: 'Tag 1',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 2',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 3',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 4',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 5',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 6',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 7',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 8',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                ],
                IO_LIST: {
                    DI: [
                        {
                            DI_LABEL: "D3_G2_DI_1",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D3_G2_DI_2",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D3_G2_DI_3",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D3_G2_DI_4",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D3_G2_DI_5",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D3_G2_DI_6",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D3_G2_DI_7",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D3_G2_DI_8",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                    ],
                    AI: [
                        {
                            AI_LABEL: "A3_G2_AI_1",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A3_G2_AI_2",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A3_G2_AI_3",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A3_G2_AI_4",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A3_G2_AI_5",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A3_G2_AI_6",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A3_G2_AI_7",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A3_G2_AI_8",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                    ],
                },
            },
            {
                GROUPTAG_NAME: 'Group Tag 3C',
                GROUPTAG_VISIBLE: false,
                GROUPTAG_INDEX: 3,
                GROUPTAG_PLOTCONFIG: {
                    X_AXIS_SPAN: 10,
                    X_AXIS_UNIT: 'secs',
                    X_AXIS_SAMPLEPERSPAN: 10,
                    X_AXIS_NUMBERDIV: 10,
                    X_AXIS_LABEL:'X Axis',
                    Y_AXIS_TYPE: 'EU',
                    Y_AXIS_MINVAL: 0,
                    Y_AXIS_MAXVAL: 65535,
                    Y_AXIS_NUMBERDIV: 10,
                    Y_AXIS_LABEL:'Y Axis',
                },
                TAG_LIST: [
                    {
                        TAG_NAME: 'Tag 1',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 2',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 3',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 4',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 5',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 6',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 7',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 8',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                ],
                IO_LIST: {
                    DI: [
                        {
                            DI_LABEL: "D3_G3_DI_1",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D3_G3_DI_2",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D3_G3_DI_3",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D3_G3_DI_4",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D3_G3_DI_5",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D3_G3_DI_6",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D3_G3_DI_7",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D3_G3_DI_8",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                    ],
                    AI: [
                        {
                            AI_LABEL: "A3_G3_AI_1",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A3_G3_AI_2",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A3_G3_AI_3",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A3_G3_AI_4",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A3_G3_AI_5",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A3_G3_AI_6",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A3_G3_AI_7",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A3_G3_AI_8",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                    ],
                },
            },
            {
                GROUPTAG_NAME: 'Group Tag 3D',
                GROUPTAG_VISIBLE: false,
                GROUPTAG_INDEX: 4,
                GROUPTAG_PLOTCONFIG: {
                    X_AXIS_SPAN: 10,
                    X_AXIS_UNIT: 'secs',
                    X_AXIS_SAMPLEPERSPAN: 10,
                    X_AXIS_NUMBERDIV: 10,
                    X_AXIS_LABEL:'X Axis',
                    Y_AXIS_TYPE: 'EU',
                    Y_AXIS_MINVAL: 0,
                    Y_AXIS_MAXVAL: 65535,
                    Y_AXIS_NUMBERDIV: 10,
                    Y_AXIS_LABEL:'Y Axis',
                },
                TAG_LIST: [
                    {
                        TAG_NAME: 'Tag 1',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 2',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 3',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 4',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 5',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 6',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 7',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 8',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                ],
                IO_LIST: {
                    DI: [
                        {
                            DI_LABEL: "D3_G4_DI_1",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D3_G4_DI_2",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D3_G4_DI_3",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D3_G4_DI_4",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D3_G4_DI_5",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D3_G4_DI_6",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D3_G4_DI_7",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D3_G4_DI_8",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                    ],
                    AI: [
                        {
                            AI_LABEL: "A3_G4_AI_1",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A3_G4_AI_2",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A3_G4_AI_3",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A3_G4_AI_4",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A3_G4_AI_5",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A3_G4_AI_6",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A3_G4_AI_7",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A3_G4_AI_8",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                    ],
                },
            },
            {
                GROUPTAG_NAME: 'Group Tag 3E',
                GROUPTAG_VISIBLE: false,
                GROUPTAG_INDEX: 5,
                GROUPTAG_PLOTCONFIG: {
                    X_AXIS_SPAN: 10,
                    X_AXIS_UNIT: 'secs',
                    X_AXIS_SAMPLEPERSPAN: 10,
                    X_AXIS_NUMBERDIV: 10,
                    X_AXIS_LABEL:'X Axis',
                    Y_AXIS_TYPE: 'EU',
                    Y_AXIS_MINVAL: 0,
                    Y_AXIS_MAXVAL: 65535,
                    Y_AXIS_NUMBERDIV: 10,
                    Y_AXIS_LABEL:'Y Axis',
                },
                TAG_LIST: [
                    {
                        TAG_NAME: 'Tag 1',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 2',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 3',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 4',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 5',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 6',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 7',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 8',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                ],
                IO_LIST: {
                    DI: [
                        {
                            DI_LABEL: "D3_G5_DI_1",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D3_G5_DI_2",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D3_G5_DI_3",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D3_G5_DI_4",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D3_G5_DI_5",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D3_G5_DI_6",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D3_G5_DI_7",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D3_G5_DI_8",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                    ],
                    AI: [
                        {
                            AI_LABEL: "A3_G5_AI_1",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A3_G5_AI_2",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A3_G5_AI_3",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A3_G5_AI_4",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A3_G5_AI_5",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A3_G5_AI_6",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A3_G5_AI_7",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A3_G5_AI_8",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                    ],
                },
            },
            {
                GROUPTAG_NAME: 'Group Tag 3F',
                GROUPTAG_VISIBLE: false,
                GROUPTAG_INDEX: 6,
                GROUPTAG_PLOTCONFIG: {
                    X_AXIS_SPAN: 10,
                    X_AXIS_UNIT: 'secs',
                    X_AXIS_SAMPLEPERSPAN: 10,
                    X_AXIS_NUMBERDIV: 10,
                    X_AXIS_LABEL:'X Axis',
                    Y_AXIS_TYPE: 'EU',
                    Y_AXIS_MINVAL: 0,
                    Y_AXIS_MAXVAL: 65535,
                    Y_AXIS_NUMBERDIV: 10,
                    Y_AXIS_LABEL:'Y Axis',
                },
                TAG_LIST: [
                    {
                        TAG_NAME: 'Tag 1',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 2',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 3',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 4',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 5',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 6',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 7',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 8',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                ],
                IO_LIST: {
                    DI: [
                        {
                            DI_LABEL: "D3_G6_DI_1",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D3_G6_DI_2",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D3_G6_DI_3",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D3_G6_DI_4",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D3_G6_DI_5",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D3_G6_DI_6",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D3_G6_DI_7",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D3_G6_DI_8",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                    ],
                    AI: [
                        {
                            AI_LABEL: "A3_G6_AI_1",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A3_G6_AI_2",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A3_G6_AI_3",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A3_G6_AI_4",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A3_G6_AI_5",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A3_G6_AI_6",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A3_G6_AI_7",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A3_G6_AI_8",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                    ],
                },
            },
            {
                GROUPTAG_NAME: 'Group Tag 3G',
                GROUPTAG_VISIBLE: false,
                GROUPTAG_INDEX: 7,
                GROUPTAG_PLOTCONFIG: {
                    X_AXIS_SPAN: 10,
                    X_AXIS_UNIT: 'secs',
                    X_AXIS_SAMPLEPERSPAN: 10,
                    X_AXIS_NUMBERDIV: 10,
                    X_AXIS_LABEL:'X Axis',
                    Y_AXIS_TYPE: 'EU',
                    Y_AXIS_MINVAL: 0,
                    Y_AXIS_MAXVAL: 65535,
                    Y_AXIS_NUMBERDIV: 10,
                    Y_AXIS_LABEL:'Y Axis',
                },
                TAG_LIST: [
                    {
                        TAG_NAME: 'Tag 1',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 2',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 3',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 4',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 5',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 6',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 7',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 8',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                ],
                IO_LIST: {
                    DI: [
                        {
                            DI_LABEL: "D3_G7_DI_1",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D3_G7_DI_2",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D3_G7_DI_3",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D3_G7_DI_4",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D3_G7_DI_5",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D3_G7_DI_6",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D3_G7_DI_7",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D3_G7_DI_8",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                    ],
                    AI: [
                        {
                            AI_LABEL: "A3_G7_AI_1",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A3_G7_AI_2",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A3_G7_AI_3",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A3_G7_AI_4",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A3_G7_AI_5",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A3_G7_AI_6",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A3_G7_AI_7",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A3_G7_AI_8",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                    ],
                },
            },
            {
                GROUPTAG_NAME: 'Group Tag 3H',
                GROUPTAG_VISIBLE: false,
                GROUPTAG_INDEX: 8,
                GROUPTAG_PLOTCONFIG: {
                    X_AXIS_SPAN: 10,
                    X_AXIS_UNIT: 'secs',
                    X_AXIS_SAMPLEPERSPAN: 10,
                    X_AXIS_NUMBERDIV: 10,
                    X_AXIS_LABEL:'X Axis',
                    Y_AXIS_TYPE: 'EU',
                    Y_AXIS_MINVAL: 0,
                    Y_AXIS_MAXVAL: 65535,
                    Y_AXIS_NUMBERDIV: 10,
                    Y_AXIS_LABEL:'Y Axis',
                },
                TAG_LIST: [
                    {
                        TAG_NAME: 'Tag 1',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 2',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 3',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 4',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 5',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 6',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 7',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 8',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                ],
                IO_LIST: {
                    DI: [
                        {
                            DI_LABEL: "D3_G8_DI_1",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D3_G8_DI_2",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D3_G8_DI_3",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D3_G8_DI_4",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D3_G8_DI_5",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D3_G8_DI_6",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D3_G8_DI_7",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D3_G8_DI_8",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                    ],
                    AI: [
                        {
                            AI_LABEL: "A3_G8_AI_1",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A3_G8_AI_2",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A3_G8_AI_3",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A3_G8_AI_4",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A3_G8_AI_5",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A3_G8_AI_6",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A3_G8_AI_7",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A3_G8_AI_8",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                    ],
                },
            },
        ]
    },
    {
        DEVICE_NAME: 'Device 4',
        DEVICE_VISIBLE: true,
        DEVICE_INDEX: 4,
        GROUPTAG_LIST: [
            {
                GROUPTAG_NAME: 'Group Tag 4A',
                GROUPTAG_VISIBLE: false,
                GROUPTAG_INDEX: 1,
                GROUPTAG_PLOTCONFIG: {
                    X_AXIS_SPAN: 10,
                    X_AXIS_UNIT: 'secs',
                    X_AXIS_SAMPLEPERSPAN: 10,
                    X_AXIS_NUMBERDIV: 10,
                    X_AXIS_LABEL:'X Axis',
                    Y_AXIS_TYPE: 'EU',
                    Y_AXIS_MINVAL: 0,
                    Y_AXIS_MAXVAL: 65535,
                    Y_AXIS_NUMBERDIV: 10,
                    Y_AXIS_LABEL:'Y Axis',
                },
                TAG_LIST: [
                    {
                        TAG_NAME: 'Tag 1',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 2',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 3',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 4',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 5',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 6',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 7',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 8',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                ],
                IO_LIST: {
                    DI: [
                        {
                            DI_LABEL: "D4_G1_DI_1",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D4_G1_DI_2",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D4_G1_DI_3",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D4_G1_DI_4",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D4_G1_DI_5",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D4_G1_DI_6",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D4_G1_DI_7",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D4_G1_DI_8",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                    ],
                    AI: [
                        {
                            AI_LABEL: "A4_G1_AI_1",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A4_G1_AI_2",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A4_G1_AI_3",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A4_G1_AI_4",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A4_G1_AI_5",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A4_G1_AI_6",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A4_G1_AI_7",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A4_G1_AI_8",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                    ],
                },
            },
            {
                GROUPTAG_NAME: 'Group Tag 4B',
                GROUPTAG_VISIBLE: false,
                GROUPTAG_INDEX: 2,
                GROUPTAG_PLOTCONFIG: {
                    X_AXIS_SPAN: 10,
                    X_AXIS_UNIT: 'secs',
                    X_AXIS_SAMPLEPERSPAN: 10,
                    X_AXIS_NUMBERDIV: 10,
                    X_AXIS_LABEL:'X Axis',
                    Y_AXIS_TYPE: 'EU',
                    Y_AXIS_MINVAL: 0,
                    Y_AXIS_MAXVAL: 65535,
                    Y_AXIS_NUMBERDIV: 10,
                    Y_AXIS_LABEL:'Y Axis',
                },
                TAG_LIST: [
                    {
                        TAG_NAME: 'Tag 1',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 2',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 3',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 4',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 5',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 6',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 7',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 8',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                ],
                IO_LIST: {
                    DI: [
                        {
                            DI_LABEL: "D4_G2_DI_1",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D4_G2_DI_2",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D4_G2_DI_3",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D4_G2_DI_4",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D4_G2_DI_5",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D4_G2_DI_6",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D4_G2_DI_7",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D4_G2_DI_8",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                    ],
                    AI: [
                        {
                            AI_LABEL: "A4_G2_AI_1",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A4_G2_AI_2",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A4_G2_AI_3",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A4_G2_AI_4",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A4_G2_AI_5",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A4_G2_AI_6",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A4_G2_AI_7",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A4_G2_AI_8",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                    ],
                },
            },
            {
                GROUPTAG_NAME: 'Group Tag 4C',
                GROUPTAG_VISIBLE: false,
                GROUPTAG_INDEX: 3,
                GROUPTAG_PLOTCONFIG: {
                    X_AXIS_SPAN: 10,
                    X_AXIS_UNIT: 'secs',
                    X_AXIS_SAMPLEPERSPAN: 10,
                    X_AXIS_NUMBERDIV: 10,
                    X_AXIS_LABEL:'X Axis',
                    Y_AXIS_TYPE: 'EU',
                    Y_AXIS_MINVAL: 0,
                    Y_AXIS_MAXVAL: 65535,
                    Y_AXIS_NUMBERDIV: 10,
                    Y_AXIS_LABEL:'Y Axis',
                },
                TAG_LIST: [
                    {
                        TAG_NAME: 'Tag 1',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 2',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 3',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 4',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 5',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 6',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 7',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 8',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                ],
                IO_LIST: {
                    DI: [
                        {
                            DI_LABEL: "D4_G3_DI_1",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D4_G3_DI_2",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D4_G3_DI_3",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D4_G3_DI_4",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D4_G3_DI_5",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D4_G3_DI_6",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D4_G3_DI_7",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D4_G3_DI_8",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                    ],
                    AI: [
                        {
                            AI_LABEL: "A4_G3_AI_1",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A4_G3_AI_2",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A4_G3_AI_3",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A4_G3_AI_4",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A4_G3_AI_5",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A4_G3_AI_6",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A4_G3_AI_7",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A4_G3_AI_8",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                    ],
                },
            },
            {
                GROUPTAG_NAME: 'Group Tag 4D',
                GROUPTAG_VISIBLE: false,
                GROUPTAG_INDEX: 4,
                GROUPTAG_PLOTCONFIG: {
                    X_AXIS_SPAN: 10,
                    X_AXIS_UNIT: 'secs',
                    X_AXIS_SAMPLEPERSPAN: 10,
                    X_AXIS_NUMBERDIV: 10,
                    X_AXIS_LABEL:'X Axis',
                    Y_AXIS_TYPE: 'EU',
                    Y_AXIS_MINVAL: 0,
                    Y_AXIS_MAXVAL: 65535,
                    Y_AXIS_NUMBERDIV: 10,
                    Y_AXIS_LABEL:'Y Axis',
                },
                TAG_LIST: [
                    {
                        TAG_NAME: 'Tag 1',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 2',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 3',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 4',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 5',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 6',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 7',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 8',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                ],
                IO_LIST: {
                    DI: [
                        {
                            DI_LABEL: "D4_G4_DI_1",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D4_G4_DI_2",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D4_G4_DI_3",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D4_G4_DI_4",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D4_G4_DI_5",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D4_G4_DI_6",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D4_G4_DI_7",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D4_G4_DI_8",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                    ],
                    AI: [
                        {
                            AI_LABEL: "A4_G4_AI_1",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A4_G4_AI_2",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A4_G4_AI_3",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A4_G4_AI_4",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A4_G4_AI_5",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A4_G4_AI_6",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A4_G4_AI_7",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A4_G4_AI_8",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                    ],
                },
            },
            {
                GROUPTAG_NAME: 'Group Tag 4E',
                GROUPTAG_VISIBLE: false,
                GROUPTAG_INDEX: 5,
                GROUPTAG_PLOTCONFIG: {
                    X_AXIS_SPAN: 10,
                    X_AXIS_UNIT: 'secs',
                    X_AXIS_SAMPLEPERSPAN: 10,
                    X_AXIS_NUMBERDIV: 10,
                    X_AXIS_LABEL:'X Axis',
                    Y_AXIS_TYPE: 'EU',
                    Y_AXIS_MINVAL: 0,
                    Y_AXIS_MAXVAL: 65535,
                    Y_AXIS_NUMBERDIV: 10,
                    Y_AXIS_LABEL:'Y Axis',
                },
                TAG_LIST: [
                    {
                        TAG_NAME: 'Tag 1',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 2',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 3',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 4',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 5',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 6',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 7',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 8',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                ],
                IO_LIST: {
                    DI: [
                        {
                            DI_LABEL: "D4_G5_DI_1",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D4_G5_DI_2",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D4_G5_DI_3",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D4_G5_DI_4",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D4_G5_DI_5",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D4_G5_DI_6",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D4_G5_DI_7",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D4_G5_DI_8",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                    ],
                    AI: [
                        {
                            AI_LABEL: "A4_G5_AI_1",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A4_G5_AI_2",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A4_G5_AI_3",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A4_G5_AI_4",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A4_G5_AI_5",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A4_G5_AI_6",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A4_G5_AI_7",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A4_G5_AI_8",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                    ],
                },
            },
            {
                GROUPTAG_NAME: 'Group Tag 4F',
                GROUPTAG_VISIBLE: false,
                GROUPTAG_INDEX: 6,
                GROUPTAG_PLOTCONFIG: {
                    X_AXIS_SPAN: 10,
                    X_AXIS_UNIT: 'secs',
                    X_AXIS_SAMPLEPERSPAN: 10,
                    X_AXIS_NUMBERDIV: 10,
                    X_AXIS_LABEL:'X Axis',
                    Y_AXIS_TYPE: 'EU',
                    Y_AXIS_MINVAL: 0,
                    Y_AXIS_MAXVAL: 65535,
                    Y_AXIS_NUMBERDIV: 10,
                    Y_AXIS_LABEL:'Y Axis',
                },
                TAG_LIST: [
                    {
                        TAG_NAME: 'Tag 1',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 2',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 3',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 4',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 5',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 6',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 7',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 8',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                ],
                IO_LIST: {
                    DI: [
                        {
                            DI_LABEL: "D4_G6_DI_1",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D4_G6_DI_2",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D4_G6_DI_3",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D4_G6_DI_4",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D4_G6_DI_5",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D4_G6_DI_6",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D4_G6_DI_7",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D4_G6_DI_8",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                    ],
                    AI: [
                        {
                            AI_LABEL: "A4_G6_AI_1",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A4_G6_AI_2",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A4_G6_AI_3",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A4_G6_AI_4",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A4_G6_AI_5",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A4_G6_AI_6",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A4_G6_AI_7",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A4_G6_AI_8",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                    ],
                },
            },
            {
                GROUPTAG_NAME: 'Group Tag 4G',
                GROUPTAG_VISIBLE: false,
                GROUPTAG_INDEX: 7,
                GROUPTAG_PLOTCONFIG: {
                    X_AXIS_SPAN: 10,
                    X_AXIS_UNIT: 'secs',
                    X_AXIS_SAMPLEPERSPAN: 10,
                    X_AXIS_NUMBERDIV: 10,
                    X_AXIS_LABEL:'X Axis',
                    Y_AXIS_TYPE: 'EU',
                    Y_AXIS_MINVAL: 0,
                    Y_AXIS_MAXVAL: 65535,
                    Y_AXIS_NUMBERDIV: 10,
                    Y_AXIS_LABEL:'Y Axis',
                },
                TAG_LIST: [
                    {
                        TAG_NAME: 'Tag 1',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 2',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 3',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 4',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 5',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 6',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 7',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 8',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                ],
                IO_LIST: {
                    DI: [
                        {
                            DI_LABEL: "D4_G7_DI_1",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D4_G7_DI_2",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D4_G7_DI_3",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D4_G7_DI_4",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D4_G7_DI_5",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D4_G7_DI_6",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D4_G7_DI_7",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D4_G7_DI_8",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                    ],
                    AI: [
                        {
                            AI_LABEL: "A4_G7_AI_1",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A4_G7_AI_2",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A4_G7_AI_3",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A4_G7_AI_4",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A4_G7_AI_5",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A4_G7_AI_6",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A4_G7_AI_7",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A4_G7_AI_8",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                    ],
                },
            },
            {
                GROUPTAG_NAME: 'Group Tag 4H',
                GROUPTAG_VISIBLE: false,
                GROUPTAG_INDEX: 8,
                GROUPTAG_PLOTCONFIG: {
                    X_AXIS_SPAN: 10,
                    X_AXIS_UNIT: 'secs',
                    X_AXIS_SAMPLEPERSPAN: 10,
                    X_AXIS_NUMBERDIV: 10,
                    X_AXIS_LABEL:'X Axis',
                    Y_AXIS_TYPE: 'EU',
                    Y_AXIS_MINVAL: 0,
                    Y_AXIS_MAXVAL: 65535,
                    Y_AXIS_NUMBERDIV: 10,
                    Y_AXIS_LABEL:'Y Axis',
                },
                TAG_LIST: [
                    {
                        TAG_NAME: 'Tag 1',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 2',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 3',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 4',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 5',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 6',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 7',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                    {
                        TAG_NAME: 'Tag 8',
                        TAG_VISIBLE: false,
                        TAG_DATASOURCE: 'dummy',
                        TAG_INDEX: 0,
                        TAG_MINVAL: 0,
                        TAG_MAXVAL: 65535,
                        TAG_MINEU: 0,
                        TAG_MAXEU: 65535,
                        TAG_EU: 'Analog'
                    },
                ],
                IO_LIST: {
                    DI: [
                        {
                            DI_LABEL: "D4_G8_DI_1",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D4_G8_DI_2",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D4_G8_DI_3",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D4_G8_DI_4",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D4_G8_DI_5",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D4_G8_DI_6",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D4_G8_DI_7",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                        {
                            DI_LABEL: "D4_G8_DI_8",
                            DI_ENABLE: true,
                            DI_TYPE: "toggle",
                            DI_TARGET: "arduino",
                        },
                    ],
                    AI: [
                        {
                            AI_LABEL: "A4_G8_AI_1",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A4_G8_AI_2",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A4_G8_AI_3",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A4_G8_AI_4",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A4_G8_AI_5",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A4_G8_AI_6",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A4_G8_AI_7",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                        {
                            AI_LABEL: "A4_G8_AI_8",
                            AI_ENABLE: true,
                            AI_MINVAL: 0,
                            AI_MAXVAL: 65535,
                            AI_TARGET: "arduino",
                        },
                    ],
                }, // JS : end of IO_LIST
            },
        ] // JS : end of GROUPTAG_LIST
    },
];// JS : end of ConfigDefault

//Buffer data battery monitoring dari serial
var Buff_Unit_A1 = [
    [0],[0],[0],[0],[0],
    [0],[0],
    [0],[0]
];
var timestampBuff_Unit_A1 = [
    [0],[0],[0],[0],[0],
    [0],[0],
    [0],[0]
];
var currentBuff_Unit_A1 = [
    [0],[0],[0],[0],[0],
    [0],[0],
    [0],[0]
];
const dataLimit = 20;
const normalDataLimit = 100;
// Jumlah data, atau jumlah kolom
// ada 4 tegangan 1 arus (baterai) + 2 (motor) + 2 (controller)
// 5 data + 2 data + 2 data = 9
const seriesCount = 9;

// variabel buffer versi baru
var currentBuffer = {
    data:[],
    timestamp:'',
};

var currentBufferArduinoUnmerged = {
    data:[],
    timestamp:'',   
};

var currentBufferArduino = {
    data:[],
    timestamp:'',   
};

// deklarasi buffer konfigurasi plot
var currentConfig = {
    TAG_LIST: ConfigDefault,
};

// deklarasi buffer request io
var currentIO = {
    IO_LIST: {
        DI:{
            data: [
                false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
                false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
                false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
                false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
                false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
                false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
                false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
                false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
                false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
                false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
                false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
                false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
                false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
                false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
                false, false, false, false, false
              ],
            timestamp: "00:00:00"
        },
        AI:{
            data: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0
            ],
            timestamp: "00:00:00"
        }
    }
};

var prevIO = {
    IO_LIST: {
        DI:{
            data: [
                false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
                false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
                false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
                false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
                false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
                false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
                false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
                false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
                false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
                false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
                false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
                false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
                false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
                false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
                false, false, false, false, false
              ],
            timestamp: "00:00:00"
        },
        AI:{
            data: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0
            ],
            timestamp: "00:00:00"
        }
    }
};

//deklarasi objek serial
var portName = "COM3";
var myPort = new serialport(portName,{
    baudRate:115200
});
var serial_counter = 10;
var iter=0;

//deklarasi objek server (data ke webserver)
const app = express();
const port = 5000;

//funciton codes
var pollCharacter;

const WRITE_DO = 0x05;
const WRITE_AO = 0x06;

const READ_SD = 0x14;
const WRITE_CONFIG = 0x15;
const READ_CONFIG = 0x16;
const WRITE_NAMED_CSV = 0x17;
const BROWSE_CSV = 0x18;

const the_STX = 0x02;

const startChar = ['#'];
const endChar = '$';

/************************ Deklarasi fungsi/event ***************************/
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function GenerateRandom(currentbuffer) {
    for(var i=0;i<256;i++){
        currentbuffer.data[i] = getRndInteger(800,1500);
    }
    currentbuffer.timestamp = String(moment().format('hh:mm:ss'));

    return currentbuffer;
}

/*
 * 1. Data dari device ke webserver
 */
function StoreToBuffer(currentBuff,Buff,Timestamp){
    for(var i=0;i<seriesCount;i++){
        if((Buff[i].length)>dataLimit){
            Buff[i].shift();
            Buff[i][dataLimit] = currentBuff[i][0];
            Timestamp[i].shift();
            Timestamp[i][dataLimit] = String(moment().format('hh:mm:ss'));
        }
        else{
            Buff[i][Buff[i].length] = currentBuff[i][0];
            Timestamp[i][Timestamp[i].length] = String(moment().format('hh:mm:ss'));
        }
    }
    return [Buff,Timestamp];
}

//event listener untuk mengoper data dari serial ke server
function expressGETBuffer(){
    GenerateRandom(currentBuffer);
    app.get('/api/buffer',(req,res) =>{
        res.json({
            arduino: currentBufferArduino,
            dummy: currentBuffer
        });
    });
    //console.log("2a. GET to Server");
}

//event listener untuk mengoper data konfigurasi kembali ke react
function expressGETConfig(){
    app.get('/api/config',(req,res) =>{
        res.json(currentConfig.TAG_LIST);
    });
    //console.log("2a. GET to Server");
}

//event Listener bila ada serial masuk dari Arduini
myPort.on("data", (line) => {
    //console.log("1a. Serial data Acquired");
    iter +=1;
    //ubah tipe data Buffer Javascript jadi Array
    bufferArray = [...line];
    console.log(bufferArray);

    //satukan data buffer menjadi integer
    if(bufferArray.indexOf(0x11) !== -1){
        
        console.log("tetew");
        tempAct1_int = (bufferArray[2]<<8) | bufferArray[1];
        tempAct2_int = (bufferArray[4]<<8) | bufferArray[3];
        tempAdj_int = (bufferArray[6]<<8) | bufferArray[5];

        fanAdj_int = bufferArray[7];

        IPeak_int = (bufferArray[9]<<8) | bufferArray[8];
        IRMS_int = (bufferArray[11]<<8) | bufferArray[10];
        humAct_int = (bufferArray[13]<<8) | bufferArray[12];

        statOn_int = bufferArray[14];
        statRel_int = bufferArray[15];

        //konversi integer ke float    
        tempAct1 = tempAct1_int/100.0; if(tempAct1>normalDataLimit) tempAct1=0;
        tempAct2 = tempAct2_int/100.0; if(tempAct2>normalDataLimit) tempAct2=0;
        tempAdj = tempAdj_int/100.0; if(tempAdj>normalDataLimit) tempAdj=0;

        fanAdj = fanAdj_int/100.0; if(fanAdj>normalDataLimit) fanAdj=0;

        IPeak = IPeak_int/100.0; if(IPeak>normalDataLimit) IPeak=0;
        IRMS = IRMS_int/100.0; if(IRMS>normalDataLimit) IRMS=0;
        humAct = humAct_int/100.0; if(humAct>normalDataLimit) humAct=0;

        statOn = statOn_int; if(statOn>normalDataLimit) statOn=0;
        statRel = statRel_int; if(statRel>normalDataLimit) statRel=0;

        currentBufferArduino.data[0] = tempAct1;
        currentBufferArduino.data[1] = tempAct2;
        currentBufferArduino.data[2] = tempAdj;
        currentBufferArduino.data[3] = fanAdj;
        currentBufferArduino.data[4] = IPeak;
        currentBufferArduino.data[5] = IRMS;
        currentBufferArduino.data[6] = humAct;
        currentBufferArduino.data[7] = statOn;
        currentBufferArduino.data[8] = statRel;

        //console.log("1b. Serial data Converted");
    }
    //masukkan ke buffer agar dapat diakses chart dan server
    /*
    currentBuff_Unit_A1 = [[V1],[V2],[V3],[V4],[Arus],[VM1],[VM2],[VC1],[VC2]];
    StoreToBuffer(currentBuff_Unit_A1,Buff_Unit_A1,timestampBuff_Unit_A1);
    */
    //console.log("1c. Serial data Stored to Buffer");
    
    /*
    if (iter<17){
        if(iter===0) currentBufferArduinoUnmerged.data = bufferArray;
        else currentBufferArduinoUnmerged.data = currentBufferArduinoUnmerged.data.concat(bufferArray);
        //console.log(bufferArray);
    }
    else if (iter===17){
        currentBufferArduinoUnmerged.timestamp = String(moment().format('hh:mm:ss'));
    
        for(var gabung=0; gabung<256; gabung++){
            currentBufferArduinoUnmerged.data[gabung] = currentBufferArduinoUnmerged.data[2*gabung] | currentBufferArduinoUnmerged.data[2*gabung+1]<<8;
        }
        currentBufferArduino.data = currentBufferArduinoUnmerged.data.slice(0,256);
        //console.log(currentBufferArduino);
        // JS : KELUARKAN DATANYA DI SINI

        currentBufferArduinoUnmerged.data = [];

        iter=0;
    }
    */
    //debug
    /*
    console.log(bufferArray);
    console.log(`iter:${iter}`);
    console.log(`Arus : ${Arus}`);
    console.log('V1 : '+ String(V1));
    console.log(`V2 : ${V2}`);
    */
});

myPort.on("close",() => {
    console.log("RECON coz close");
    myPort.resume();
});

myPort.on("error",() => {
    console.log("RECON coz error");
    myPort.resume();
});

/*
 * 2. Data dari webserver ke device
 */
function expressPOSTBuffer(){
    app.post('/api/request', (req, res) => {
        currentConfig = {
          TAG_LIST: req.body.TAG_LIST,
        };
      
        //requests.push(newRequest);
        //console.log(newRequest.TAG_LIST[2].GROUPTAG_LIST[4].TAG_LIST);
      });
    expressGETConfig();
}

/*
 * 3. Request IO dari webserver ke device
 */
function expressPOSTIO(){
    var eightAI = [0,0,0,0,0,0,0,0];

    app.post('/api/request_io', (req, res) => {
        currentIO = {
          IO_LIST: req.body.IO_LIST,
        };
        //console.log(currentIO.IO_LIST.AI.data);
        
        for(var eightIndex=0; eightIndex<8; eightIndex++){
            eightAI[eightIndex] = currentIO.IO_LIST.AI.data[eightIndex];
        }
        
        eightAI = eightAI.map(
            (value) => parseInt((
                (
                    parseFloat(value)/100
                )*
                (
                    parseFloat(currentConfig.TAG_LIST[0].GROUPTAG_LIST[0].IO_LIST.AI[0].AI_MAXVAL)-parseFloat(currentConfig.TAG_LIST[0].GROUPTAG_LIST[0].IO_LIST.AI[0].AI_MINVAL)
                )+
                currentConfig.TAG_LIST[0].GROUPTAG_LIST[0].IO_LIST.AI[0].AI_MINVAL
            ).toFixed(0))
        );

        // tulis do
        //console.log(currentIO.IO_LIST.DI.data[0]?[1]:[0]);
        if(currentIO.IO_LIST.DI.data[0] !== prevIO.IO_LIST.DI.data[0]){
            pollCharacter = [0x18];
            myPort.write(pollCharacter.concat(currentIO.IO_LIST.DI.data[0]?[1]:[0]).concat(pollCharacter));
            //console.log(pollCharacter.concat(currentIO.IO_LIST.DI.data[0]?[0x01]:[0x00]).concat(pollCharacter));
        }

        if(currentIO.IO_LIST.DI.data[1] !== prevIO.IO_LIST.DI.data[1]){
            //console.log(currentIO.IO_LIST.DI.data[1]?[1]:[0]);
            pollCharacter = [0x16];
            myPort.write(pollCharacter.concat(currentIO.IO_LIST.DI.data[1]?[1]:[0]).concat(pollCharacter));
        }

        if(currentIO.IO_LIST.DI.data[2] !== prevIO.IO_LIST.DI.data[2]){
            //console.log(currentIO.IO_LIST.DI.data[2]?[1]:[0]);
            pollCharacter = [0x17];
            myPort.write(pollCharacter.concat(currentIO.IO_LIST.DI.data[2]?[1]:[0]).concat(pollCharacter));
        }

        if(currentIO.IO_LIST.DI.data[3] !== prevIO.IO_LIST.DI.data[3]){
            //console.log(currentIO.IO_LIST.DI.data[3]?[1]:[0]);
            pollCharacter = [0x12];
            myPort.write(pollCharacter.concat(currentIO.IO_LIST.DI.data[3]?[1]:[0]).concat(pollCharacter));
        }

        if(currentIO.IO_LIST.DI.data[4] !== prevIO.IO_LIST.DI.data[4]){
            //console.log(currentIO.IO_LIST.DI.data[4]?[1]:[0]);
            pollCharacter = [0x13];
            myPort.write(pollCharacter.concat(currentIO.IO_LIST.DI.data[4]?[1]:[0]).concat(pollCharacter));
        }

        if(currentIO.IO_LIST.DI.data[5] !== prevIO.IO_LIST.DI.data[5]){
            //console.log(currentIO.IO_LIST.DI.data[5]?[1]:[0]);
            pollCharacter = [0x14];
            myPort.write(pollCharacter.concat(currentIO.IO_LIST.DI.data[5]?[1]:[0]).concat(pollCharacter));
        }

        if(currentIO.IO_LIST.DI.data[6] !== prevIO.IO_LIST.DI.data[6]){
            //console.log(currentIO.IO_LIST.DI.data[6]?[1]:[0]);
            pollCharacter = [0x15];
            myPort.write(pollCharacter.concat(currentIO.IO_LIST.DI.data[6]?[1]:[0]).concat(pollCharacter));
        }

        //console.log(eightAI);
        //requests.push(newRequest);
        //console.log(newRequest.TAG_LIST[2].GROUPTAG_LIST[4].TAG_LIST);

        prevIO = currentIO;
      });
}
/****************************** Main Loop ***********************************/
app.use(express.json({limit: '50mb'}));
app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );

// ekivalen dengan void setup(), dijalankan sekali
expressGETConfig();
expressPOSTBuffer();
expressPOSTIO();

// ekivalen dengan void loop(), dijalankan berulang kali
//untuk polling data tiap x detik
function pollData(){
    serial_counter +=1;

    //console.log(`\n-------------------- NEW LOOP #${iter} --------------------\n`);
    if(serial_counter===20){
        pollCharacter = [0x11];
        //console.log("1. Polled Serial Port");
        myPort.write(pollCharacter);
        serial_counter=0;
    }
    //console.log("2. GET Procedure");
    expressGETBuffer();
    expressGETConfig();
    //expressPOSTBuffer();

    if(serial_counter===10){
        
        /*
        // tulis ao
        pollCharacter = WRITE_AO;
        */
    }

        
}
setInterval(pollData,100);

/******************** Finalisasi (nyalakan server) *************************/
app.listen(port, () => console.log(`Server 1 started on port ${port}`));