export const audioSamples = [
  {
    name: "Heater 1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    keyName: "Q",
    keyCode: 81,
  },
  {
    name: "Heater 2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    keyName: "W",
    keyCode: 87,
  },
  {
    name: "Heater 3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
    keyName: "E",
    keyCode: 69,
  },
  {
    name: "Heater 4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    keyName: "A",
    keyCode: 65,
  },
  {
    name: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
    keyName: "S",
    keyCode: 83,
  },
  {
    name: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
    keyName: "D",
    keyCode: 68,
  },
  {
    name: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    keyName: "Z",
    keyCode: 90,
  },
  {
    name: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
    keyName: "X",
    keyCode: 88,
  },
  {
    name: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
    keyName: "C",
    keyCode: 67,
  },
];

export let keyCodeArray = audioSamples.map((sample) => sample.keyCode);
