import { Project, Scope, SourceFile, VariableDeclarationKind } from "ts-morph";

const basePath = "./target";
const commandPath = `${basePath}/commands`

export class CodeGenerator {
    private static instance?: CodeGenerator
    private readonly project: Project

    private constructor() {
        this.project = new Project({
            useInMemoryFileSystem: true
        });
    }

    public static getInstance(): CodeGenerator {
        if (this.instance == undefined)
            this.instance = new CodeGenerator();
        return this.instance;
    }

    public getDiscordBoilerplateCode() {
        const sourceFile = this.project.createSourceFile(`${basePath}/discord.ts`);

        sourceFile.addImportDeclarations([
            {
                defaultImport: "{dirname, importx}",
                moduleSpecifier: "@discordx/importer"
            },
            {
                defaultImport: "{ IntentsBitField, type Interaction, type Message }",
                moduleSpecifier: "discord.js"
            },
            {
                defaultImport: "{Client}",
                moduleSpecifier: "discordx"
            },
            {
                defaultImport: "* as dotenv",
                moduleSpecifier: "dotenv"
            }
        ]);

        sourceFile.addStatements("\ndotenv.config();");


        sourceFile.addVariableStatement({
            declarationKind: VariableDeclarationKind.Const,
            declarations: [{
                name: "bot",
                initializer: "new Client({\nintents: [\nIntentsBitField.Flags.Guilds,\n " +
                    "IntentsBitField.Flags.GuildMessages,\nIntentsBitField.Flags.GuildMessageReactions,\n" +
                    "IntentsBitField.Flags.MessageContent,\n],\nsilent: false,\n simpleCommand: {\nprefix: '!',\n},\n});",
                type: "Client"
            }]
        });

        sourceFile.addStatements("\nbot.once('clientReady', () => {\nvoid bot.initApplicationCommands();\n});\n");
        sourceFile.addStatements("\nbot.on('interactionCreate', (interaction: Interaction) => {\nbot.executeInteraction(interaction);\n});\n");
        sourceFile.addStatements("\nbot.on('messageCreate', (message: Message) => {\nvoid bot.executeCommand(message);\n});\n");

        const runFunction = sourceFile.addFunction({
            name: "run",
            isAsync: true,
        });

        runFunction.addBody();
        runFunction.addStatements("await importx(`${dirname(import.meta.url)}/{events,commands}/**/*.{ts,js}`);\n" +
            "if (!process.env.BOT_TOKEN) {throw Error('Could not find BOT_TOKEN in your environment');}\n" +
            "await bot.login(process.env.BOT_TOKEN);");

        sourceFile.addStatements("\nvoid run();");

        sourceFile.formatText();
        sourceFile.save()

        return sourceFile.getText();
    }

    public createCommandFile(name: string, commandName: string, description: string, body: string) {

        const sourceFile = this.project.createSourceFile(`${commandPath}/${name}.ts`);
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