/* 
/* Script to split an audio file (album, mixtape, dj sets, podcasts, whatever you want) into individual tracks
/* Example: node trimMixes.js timestamp.txt mix.mp3 (see README.md for an example on usage of timestamps)
*/

const exec = require("child_process").exec
const path = require("path")
const fs = require("fs")

const timestampFile = process.argv[2]
const inputAudioFile = process.argv[3]

if (!timestampFile || !inputAudioFile) {
    console.error("Usage: node trimMixes.js <timestamp file> <input audio file>")
    process.exit(1)
}

const getExtension = file => file.split(".").pop()

const songs = fs.readFileSync(timestampFile, "utf8")
const timestamps = songs.split("\n")

let tempArray = []

timestamps.map((timestamp, index) => {
    const time = timestamp.split(":")
    const title = time[2].substr(3, time[2].length - 2).replace(/\r/g, "")

    const timeNextSong = timestamps[index + 1]
    const timeNextSongSplit = timeNextSong == undefined ? 0 : timeNextSong.split(":")

    let tempObject = {
        title,
        start: {
            hours: time[0],
            minutes: time[1],
            seconds: time[2].split(" ")[0],
        },
        end: {
            hours: timeNextSongSplit[0],
            minutes: timeNextSongSplit[1],
            seconds: typeof timeNextSongSplit[2] == "string" ? timeNextSongSplit[2].split(" ")[0] : 0,
        }
    }
    
    tempArray.push(tempObject)
})

tempArray.pop()

const outputFolder = path.dirname(inputAudioFile)

tempArray.forEach((song, index) => {
    const title = `${index + 1 < 10 ? "0" + (index + 1) : index + 1} ${song.title}`
    const start = song.start.hours + ":" + song.start.minutes + ":" + song.start.seconds
    const end = song.end.hours + ":" + song.end.minutes + ":" + song.end.seconds
    
    const command = `ffmpeg.exe -i "${inputAudioFile}" -ss ${start} -to ${end} -c copy "${outputFolder}/${title}.${getExtension(inputAudioFile)}"`
    const childProcess = exec(command)
    
    childProcess.on("spawn", () => {
        console.log(`Executing: ${command}`)
    })
});
