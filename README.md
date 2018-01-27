# **gitRemoteToUrl**
Converts `git remote get-url origin` to a valid url to open in the browser.

## **How to use?**

### Clone or install via npm

```git clone https://github.com/saurav-sahu/gitRemoteToUrl.git```

---

```npm i -g git-remote-to-url```


### Set up a git alias

```
#Set $REPOSITORY to the location where you cloned the repository

REPOSITORY='~/gitRemoteToUrl'

git config --global alias.gl "!node $REPOSITORY/get-link.js `git remote get-url origin`"
```

### Use the alias

Run ```git gl``` in a git directory to get the remote url

### Open the url in a browser

Pass ``` `git gl` ``` as an argument to other programs. Example run ```open `git gl` ``` to open the url in your browser on OS X.