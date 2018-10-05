# **gitRemoteToUrl**
Converts `git remote get-url origin` to a valid url to open in the browser.

### Clone or install via npm

`npm install -g git-remote-to-url`

or 

`yarn global add git-remote-to-url`

### Use the cli tool

Run ```grtu``` in a git directory to get the remote url

or 

Run ```grtu <location>``` to get the url for the specified location

### Open the url in a browser

Pass ``` `grtu` ``` as an argument to other programs. Example run ```open `grtu` ``` to open the url in your browser on OS X.