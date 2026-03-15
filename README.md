# Bloccord

Ever wanted to make a Discord bot, but don't want to learn how to code? Tired of having AI generate all your code? Then **Bloccord** is for you!

Built for *BCIT's* **HackTheBreak 2026**, this project combines **React**, **React Flow, Typescript**, **ts-morph**, and **Discord.ts** to streamline your bot creation using simple blocks.

This project was made with 2 members.

---

## Overview

Bloccord makes bot creation simple, easy to read, and great for beginning coders. Users can make their scripts using a user-friendly block coding interface, and download their code in just a few easy clicks.

## Inspiration

When building a Discord bot, we noticed a lot of boilerplate code was duplicated everytime you wanted to make a new function. We were inspired by *Scratch* and *Unreal Engine*s' simple interfaces to make Discord bot creation as simple, yet powerful, as possible.

## What it Does

Our app allows users to build Discord app commands using blocks. Once a user is finished creating all their commands, they can simply click *Download*, import the files into their Discord.ts project, and they're done. Users can also preview their code before downloading in case they find any mistakes.

## How We Built It

We used React and React Flow to create the blocks and connections. We used typescript to read data from the blocks, and ts-morph to transform that data into usable typescript code.

## Challenges We Ran Into

TODO

## Edge Cases

1. TODO

## Accomplishments That We're Proud Of

TODO

## What We Learned

TODO

## What's Next for Bloccord?

TODO

---

## How to Use

These steps will guide you through your bot creation journey. These steps should work on any modern system, as long as you have all the prerequisites.

### 0. Prerequisites

* [Node.js](https://nodejs.org/en/download/)
* A free [Discord](https://discord.com/) account
* A modern web browser, such as Firefox or Google Chrome
* A text editor, such as Notepad or TextEditor
* Basic command line knowledge

### 1. Setting up a Discord Bot

1. Navigate to the [Discord Developer Portal](https://discord.com/developers/applications)
2. Click on *New Application*
3. Enter a bot name in the space provided, agree to the terms of service, and click *Create*
4. Click *Bot* on the left pane
5. Click *Reset Token,* and note the token for use in a later step. This may prompt you to re-enter your Discord password; do so.
6. Scroll down to 'Privileged Gateway Intents' and enable 'Message Content Intent'
7. Navigate to *Installation* using the left pane
8. Uncheck *User Install*
9. Scroll down to 'Default Install Settings'
10. Inside of 'Scopes', add 'bot'
11. Inside of 'Persmissions', add the permissions for your bot, such as 'Send Messages.' Alternatively, add the 'Administrator' permission to allow your bot to do anything on your server. However, this could be dangerous as the bot could do anything on your server.
12. Navigate to the Install Link provided to you above 'Default Install Settings'
13. Choose a server to add your bot to, then click *Continue*
14. Make sure your required permissions are selected, then click *Authorize*. If you do not see your permissions, close the tab and go back to step 11.
15. If you've done everything correctly, you should see your new bot join your Discord server.

### 2. Setting up a Discord.ts project

1. Navigate to a memorable folder, such as Documents
2. Open a terminal in the folder
3. In the terminal, run `npx create-discordx`
4. Enter a project name, or leave blank to name it 'my-bot'
5. Pick 'npm' as your package manager by using your arrow keys to navigate and 'Enter' or 'Return' to select.
6. Choose the 'blank' template, and wait for everything to download. Once finished, you should see `√ Created discordx project`
7. Navigate the terminal to inside the project folder, which is named whatever you called it in step 4
8. Run `npm i dotenv`
9. Create a new file called .env
10. Inside the file, add a line with the content `BOT_TOKEN="YOUR BOT TOKEN"`, ensuring you replace the content with the bot token you got in the first part
11. Delete all contents of the src folder
12. You are now ready to move on to the next step

### 3. Creating your First Slash Command

There is a video showing how to create a basic command [here](). Alternatively, follow the text instructions below.

1. Navigate to [Bloccord](https://bloccord.vercel.app/)
2. Note the website layout
   INSERT LAYOUT IMAGE HERE
3. Create a new slash command by creating a new *Event trigger* block
4. Enter the command name in the block's input
5. Add a response by creating a new *Action* block
6. Enter the response content in the block's input
7. Connect the bottom handle of the *Event Trigger* to the top of the *Action* block to execute the code once the command is entered.
8. Congratulations, you've made your first slash command!
9. Once you've finished developing commands, click *Save project* to download the code as a .zip file

### 4. Importing Bloccord Code to your Project

1. Extract the contents of the .zip file into the src file in your Discord project folder.
2. That's it.

### 5. Running the Code

1. Inside of the Discord project folder, open a terminal
2. Run `npm run dev` in the terminal
3. Your bot should now be online, test it out!

**!! Note: sometimes new commands can take 5-10 minutes to register, this is normal !!**

### Troubleshooting
