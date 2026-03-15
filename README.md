# Bloccord

Ever wanted to make a Discord bot, but don't want to learn how to code? Tired of having AI generate all your code? Then **Bloccord** is for you!

Built for *BCIT's* **HackTheBreak 2026**, this project combines **React**, **React Flow**, **TypeScript**, **ts-morph**, and **Discord.ts** to streamline your bot creation using simple blocks.

This project was made with 2 members in CST Term 3.

---

## Overview

Bloccord makes bot creation simple, easy to read, and great for beginning coders. Users can make their scripts using a user-friendly block coding interface, and download their code in just a few easy clicks.

## Inspiration

When building a Discord bot, we noticed a lot of boilerplate code was duplicated everytime you wanted to make a new function. We were inspired by *Scratch* and *Unreal Engine*s' simple interfaces to make Discord bot creation as simple, yet powerful, as possible.

## What it Does

Our app allows users to build Discord app commands using blocks. Once a user is finished creating all their commands, they can simply click *Download*, import the files into their Discord.ts project, and they're done. Users can also preview their code before downloading in case they find any mistakes.

## How We Built It

We used React Flow for the visual canvas and TypeScript for type safety. Our node system uses OOP  every node type extends an abstract BaseNode class that enforces a generateCode() contract. A Factory pattern converts the visual nodes into class instances, and a Singleton CodeGenerator manages an inmemory file system using ts-morph(ts-morph to programmatically generate TypeScript files). This means adding a new node type requires zero changes to the code generation  just create the class and register it in the factory. All this makes it super easy to create more nodes.

## Challenges We Ran Into

<ul>
<li>
The bot code could not be downloaded before being zipped. This was fixed by saving all the project files into memory and zipping them up from there.
</li>
<li>
Discord only allows one interaction.reply() per command, so chaining multiple ActionNodes would crash the bot. We solved this by having CodeGenerator detect the first action vs subsequent actions and generate reply vs followUp accordingly. 
</li>
<li>
We also struggled with closing braces inside of conditions. ConditionNode generates an opening curly brace in the if statement, but we had to figure out where to close it. We decided CodeGenerator owns the structure, so it simply references the left and right nodes of it.
</li>
<li>
For nodes to stay abstract, each different kind of node takes a different class.
</li>
<li>
We initially had too much coupling in our code, so we started coding more abstract and making sure nothing depended on each other allowing us to easily create more features. This is when we started properly using OOP principles.
</li>
</ul>

## Edge Cases

1. Slash commands cannot be uppercase, so all uppercase commands are put into lowercase before being translated into code
2. Slash commands cannot be empty, so any command that is empty is changed into 'Default'
3. A command must have a reply, so a default message is generated if no replies are in the code

## Accomplishments That We're Proud Of

We made a fully functioning system to translate blocks into usable TypeScript code while following OOP principles. Neither of us were very familiar with React, and we managed to pull off a system that is both functional and aesthetically pleasing. The system came out exactly as planned, and has very few limitations. The system is also modular, which makes it incredibly easy to add more features later down the road.

## What We Learned

We learned how to use TypeScript with React. We learned about using React Flow to create user-friendly diagrams. We also learned how to dynamically create code files with ts-morph.

## What's Next for Bloccord?

We want to add more kinds of blocks to the user interface, such as message listeners, emoji reactions, loops, variables, and more. We would also like to make the bot runnable from the web browser to make setup even easier for the end-user. It would also be great if we could make the bot exportable to more than just TypeScript, such as Python or Java.

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
   ![discord layout](images/dev_portal_layout.png?raw=true)
4. Click *Bot* on the left pane
5. Click *Reset Token,* and note the token for use in a later step. This may prompt you to re-enter your Discord password; do so.
6. Scroll down to 'Privileged Gateway Intents' and enable 'Message Content Intent'
   ![bot layout](images/bot_page.png?raw=true)
7. Navigate to *Installation* using the left pane
8. Uncheck *User Install*
9. Scroll down to 'Default Install Settings'
10. Inside of 'Scopes', add 'bot'
11. Inside of 'Persmissions', add the permissions for your bot, such as 'Send Messages.' Alternatively, add the 'Administrator' permission to allow your bot to do anything on your server. However, this could be dangerous as the bot could do anything on your server.
12. Navigate to the Install Link provided to you above 'Default Install Settings'
    ![installation layout](images/installation_layout.png?raw=true)
13. Choose a server to add your bot to, then click *Continue*
14. Make sure your required permissions are selected, then click *Authorize*. If you do not see your permissions, close the tab and go back to step 11.
15. If you've done everything correctly, you should see your new bot join your Discord server.

### 2. Setting up a Discord.ts project

1. Navigate to a memorable folder, such as Documents
2. Open a terminal in the folder
3. In the terminal, run `npx create-discordx`
4. Enter a project name, or leave blank to name it 'my-bot'
5. Pick 'npm' as your package manager by using your arrow keys to navigate and 'Enter' or 'Return' to select.
6. Choose the 'blank' template, and wait for everything to download. Once finished, you should see something similar to the following image
   ![npx finished](images/discordx_finished.png?raw=true)
7. Navigate the terminal to inside the project folder, which is named whatever you called it in step 4
8. Run `npm i dotenv`
9. Create a new file called .env
10. Inside the file, add a line with the content `BOT_TOKEN="YOUR BOT TOKEN"`, ensuring you replace the content with the bot token you got in the first part
    ![env layout](images/env_layout.png?raw=true)
11. Delete all contents of the src folder
12. You are now ready to move on to the next step

### 3. Creating your First Slash Command

There is a video showing how to create a basic command [here](). Alternatively, follow the text instructions below.

1. Navigate to [Bloccord](https://bloccord.vercel.app/)
2. Note the website layout ![1762680706351](images/layout.png?raw=true)
3. Create a new slash command by creating a new *Event trigger* block
4. Enter the command name in the block's input. Note that you do NOT put in the / at the start
5. Add a response by creating a new *Action* block
6. Enter the response content in the block's input
7. Connect the bottom handle of the *Event Trigger* to the top of the *Action* block to execute the code once the command is entered. The end result should look like the following ![finsihed func](images/finished_func.png?raw=true)
8. Congratulations, you've made your first slash command!
9. Once you've finished developing commands, click *Save project* to download the code as a .zip file

### 4. Importing Bloccord Code to your Project

1. Extract the contents of the .zip file into the src file in your Discord project folder.
2. Inside the src/main.ts file, either replace the guild ID in `botGuilds`with your bot's guild id (find out how to do that [here](https://cybrancee.com/learn/knowledge-base/how-to-find-a-discord-guild-id/)), or remove the line entirely. Note that removing the line will make slash commands register much slower.
   ![main layout](images/main_layout.png?raw=true)

**!! Note: you do NOT have to replace your main.ts everytime you import code, just the first time you run !!**

### 5. Running the Code

1. Inside of the Discord project folder, open a terminal
2. Run `npm run dev` in the terminal
3. Your bot should now be online, test it out!
   ![bot running](images/bot_running.png?raw=true)

**!! Note: sometimes new commands can take 5-10 minutes to register, this is normal !!**

### Troubleshooting

* When running `npx create-discordx`, it's giving an error that the command is not found
  * Ensure you have [Node.js](https://nodejs.org/en/download/), and that it's on your system PATH.
* I get an error running the bot that dotenv / BOT_TOKEN is not found
  * Run `npm i dotenv `inside the Discord project folder, and make sure you have a .env file with your bot token inside in the format of `BOT_TOKEN="REPLACE WITH YOUR TOKEN"`
* My old slash commands are still registered
  * Just above ``await importx(\`${dirname(import.meta.url)}/{events,commands}/**/*.{ts,js}\`);`` add these lines:

    ```ts
    await bot.clearApplicationCommands(
        ...bot.guilds.cache.map((g) => g.id)
    );
    ```
