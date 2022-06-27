# trimMixes

Script to split an audio file (album, mixtape, dj sets, podcasts, whatever you want) into individual tracks

## Usage

```bash
$ node trimMixes.js timestamps.txt mix.mp3
```
## Timestamps

Timestamps must follow the following structure:
(I plan to improve the detection if I see other "timestamps formats")

```
00:00:00 Artist 01 - Track 01
00:04:20 Artist 02 - Track 03
00:28:11 Artist 03 - Track 04
01:07:25 End /!\ final length of original file
```

- Titles of the each line isn't important
<br/>
- <b>It's important to have exactly 6 digits (00:00:00) otherwise it won't work</b>
<br />
- <b>You must add the final length of the original file in `timestamps.txt`</b>
</br>

<i>I consider fixing the issues mentioned above.</i>

## Credits

<a href="https://copilot.github.com/">GitHub CoPilot</a> for writing 90% of the code