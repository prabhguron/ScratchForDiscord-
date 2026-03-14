import { Project, VariableDeclarationKind } from "ts-morph";
import { getOrderedChain } from './getConnectedChains'
import type { Node, Edge } from '@xyflow/react'
import {createNodeInstance} from './nodeFactory'

export class CodeGenerator {
    private static instance: CodeGenerator | null = null
    private constructor() { }

    public static getInstance(): CodeGenerator {
        if (this.instance == null)
            this.instance = new CodeGenerator();
        return this.instance;
    }

    // call this when user clicks "Generate Code"
    // example: CodeGenerator.getInstance().generateBotCode(nodes, edges)
    public generateBotCode(nodes: Node[], edges: Edge[]) {
        const pairs = getOrderedChain(nodes, edges)
        console.log('connected pairs:', pairs)

        for(let i =0; i < pairs.length; i++){

            for(let j =0; j < pairs[i].length; j++){
               const instance = createNodeInstance(pairs[i][j])
                console.log(instance)
                console.log(instance.generateCode())
                    
        }
    }
        
       

    }

    public getDiscordBoilerplateCode() {
        const project = new Project({ useInMemoryFileSystem: true });
        const sourceFile = project.createSourceFile("./target/discord.ts");

        sourceFile.addImportDeclarations([
            { defaultImport: "{dirname, importx}", moduleSpecifier: "@discordx/importer" },
            { defaultImport: "{ IntentsBitField, type Interaction, type Message }", moduleSpecifier: "discord.js" },
            { defaultImport: "{Client}", moduleSpecifier: "discordx" },
            { defaultImport: "* as dotenv", moduleSpecifier: "dotenv" }
        ]);

        sourceFile.addStatements("\ndotenv.config();");
        sourceFile.addVariableStatement({
            declarationKind: VariableDeclarationKind.Const,
            declarations: [{
                name: "bot",
                initializer: "new Client({\nintents: [\nIntentsBitField.Flags.Guilds,\n" +
                    "IntentsBitField.Flags.GuildMessages,\nIntentsBitField.Flags.GuildMessageReactions,\n" +
                    "IntentsBitField.Flags.MessageContent,\n],\nsilent: false,\nsimpleCommand: {\nprefix: '!',\n},\n});",
                type: "Client"
            }]
        });

        sourceFile.addStatements("\nbot.once('clientReady', () => {\nvoid bot.initApplicationCommands();\n});\n");
        sourceFile.addStatements("\nbot.on('interactionCreate', (interaction: Interaction) => {\nbot.executeInteraction(interaction);\n});\n");
        sourceFile.addStatements("\nbot.on('messageCreate', (message: Message) => {\nvoid bot.executeCommand(message);\n});\n");

        const runFunction = sourceFile.addFunction({ name: "run", isAsync: true });
        runFunction.addBody();
        runFunction.addStatements(
            "await importx(`${dirname(import.meta.url)}/{events,commands}/**/*.{ts,js}`);\n" +
            "if (!process.env.BOT_TOKEN) {throw Error('Could not find BOT_TOKEN in your environment');}\n" +
            "await bot.login(process.env.BOT_TOKEN);"
        );

        sourceFile.addStatements("\nvoid run();");
        sourceFile.formatText();
        return sourceFile.getText();
    }
}

// chain: [EventNode, ActionNode("hi"), ActionNode(emoji)]
