import { Project, VariableDeclarationKind } from "ts-morph";
import JSZip from "jszip";

const projectPath = "."
const commandPath = `${projectPath}/commands`

export class CodeGenerator {
    private static instance: CodeGenerator | null = null
    public readonly project: Project = new Project({
        useInMemoryFileSystem: true,

    });

    private constructor() { }

    public static getInstance(): CodeGenerator {
        if (this.instance == null)
            this.instance = new CodeGenerator();
        return this.instance;
    }

    save = async () => {
        const zip = new JSZip();
        this.getDiscordBoilerplateCode();

        // Get all source files from the ts-morph project
        for (const sourceFile of this.project.getSourceFiles()) {
            const filePath = sourceFile.getFilePath();
            const fileText = sourceFile.getFullText();

            // Strip leading slash to make paths relative inside the zip
            const relativePath = filePath.replace(/^\//, "");
            zip.file(relativePath, fileText);
        }

        // Generate the zip as a Blob (entirely in memory)
        const blob = await zip.generateAsync({ type: "blob" });

        // Trigger browser download
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = "discord-bot.zip";
        anchor.click();

        // Clean up the object URL after download
        URL.revokeObjectURL(url);
    }

    public getDiscordBoilerplateCode() {
        const sourceFile = this.project.createSourceFile(`${projectPath}/discord.ts`, undefined, { overwrite: true });

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

    public createCommandFile(name: string, commandName: string, description: string, body: string) {

        const sourceFile = this.project.createSourceFile(`${commandPath}/${name}.ts`, undefined, { overwrite: true });
        sourceFile.addImportDeclarations([
            {
                defaultImport: "{Discord, Slash}",
                moduleSpecifier: "discordx"
            },
            {
                defaultImport: "{type CommandInteraction}",
                moduleSpecifier: "discord.js"
            }
        ]);

        const className = name.charAt(0).toUpperCase() + name.substring(1);

        const slashClass = sourceFile.addClass({
            name: `Slash${className}`,
            isExported: true
        });

        const discordDecorator = slashClass.addDecorator({
            name: "Discord",
        });
        discordDecorator.setIsDecoratorFactory(true);

        const funcDeclaration = slashClass.addMethod({
            name: name,
            parameters: [{
                name: "interaction",
                type: "CommandInteraction"
            }],
            returnType: "Promise<void>",
            isAsync: true
        });
        const slashDecorator = funcDeclaration.addDecorator({
            name: "Slash"
        });
        slashDecorator.setIsDecoratorFactory(true);
        slashDecorator.addTypeArgument(`{\ndescription: ${description},\nname: ${commandName}`);

        funcDeclaration.addStatements(body);

        sourceFile.formatText();
        sourceFile.save();

        return sourceFile.getText();


    }

}

//chain: [EventNode, ActionNode("hi"), ActionNode(emoji)]
