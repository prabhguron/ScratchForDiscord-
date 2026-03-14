import { Project, Scope, SourceFile } from "ts-morph";

export class CodeGenerator {
    private static instance: CodeGenerator | null = null
    private constructor() { }

    public static getInstance(): CodeGenerator {
        if (this.instance == null)
            this.instance = new CodeGenerator();
        return this.instance;
    }

    public getTestCode() {
        const project = new Project({
            useInMemoryFileSystem: true
        });
        const sourceFile = project.createSourceFile(`./target/file.ts`);

        const classDeclaration = sourceFile.addClass({
            name: 'SomeClass'
        });

        const constr = classDeclaration.addConstructor({});

        constr.setBodyText('this.myProp = myProp');

        classDeclaration.addProperty({
            name: 'myProp',
            type: 'string',
            initializer: 'hello world!',
            scope: Scope.Public
        });
        sourceFile.formatText();
        console.log(sourceFile.getText());
        
    }


}