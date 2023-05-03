import * as cdk from 'aws-cdk-lib';
import { Template, Match } from 'aws-cdk-lib/assertions';
import * as Pipeline from '../lib/pipeline-stack';

test('CDK pipeline stack', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new Pipeline.PipelineStack(app, 'MyTestStack');
  // THEN

  const template = Template.fromStack(stack);

  // validate that CodePipeline is created
  template.resourceCountIs('AWS::CodePipeline::Pipeline', 1);

  // validate that CodeCommit is created for the pipeline  
  template.resourceCountIs('AWS::CodeCommit::Repository', 1);



});
