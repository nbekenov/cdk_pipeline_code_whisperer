import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import { Code, Repository } from 'aws-cdk-lib/aws-codecommit';
import {CodeBuildStep, CodePipeline, CodePipelineSource} from "aws-cdk-lib/pipelines";
import { Construct } from 'constructs';

export class PipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Creates a CodeCommit repository called 'cdk-pipeline-demo'
    const repo = new Repository(this, 'source', { 
      repositoryName: 'cdk-pipeline-demo' 
    });

    
    //pipeline declaration. With the following steps: 1. Pull the code from the repository. 2. Build the code.
    const pipeline = new CodePipeline(this, 'pipeline', {
      pipelineName: 'cdk-pipeline-ts',  
      synth: new CodeBuildStep('Synth', {
        input: CodePipelineSource.codeCommit(repo, 'main'),
        installCommands: [
          'npm install -g aws-cdk'
        ],
        commands: [
          'cd infrastructure/pipeline',
          'npm ci',
          'npm run build',
          'npx npm test',
          'npx cdk synth'
        ],
        //set primaryOutputDirectory as infrastructure/pipeline/cdk.out
        //this is where the CDK will place the output artifacts
        primaryOutputDirectory: 'infrastructure/pipeline/cdk.out'
      }),  
    });
  }
}



  
  


