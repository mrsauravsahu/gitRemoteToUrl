# **gitRemoteToUrl**
Converts `git remote get-url origin` to a valid url to open in the browser.

## **How to use?**

### Clone the repository

```git clone https://github.com/saurav-sahu/gitRemoteToUrl.git```

### Set up a git alias

```git config --global alias.gl '!node ~/gitRemoteToUrl/index.js `git remote get-url origin`'```

### Use the alias

Run ```git gl``` in a git directory to get the remote url

### Open the url in a browser

Pass ``` `git gl` ``` as an argument to other programs. Example run ```open `git gl` ``` to open the url in your browser on OS X.