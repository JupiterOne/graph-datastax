import { executeStepWithDependencies } from '@jupiterone/integration-sdk-testing';
import { buildStepTestConfigForStep } from '../../../test/config';
import { Recording, setupProjectRecording } from '../../../test/recording';
import { Steps } from '../constants';

// See test/README.md for details
let recording: Recording;
afterEach(async () => {
  await recording.stop();
});

test('fetch-access-lists', async () => {
  recording = setupProjectRecording({
    directory: __dirname,
    name: 'fetch-access-lists',
  });

  const stepConfig = buildStepTestConfigForStep(Steps.ACCESS_LISTS);
  const stepResult = await executeStepWithDependencies(stepConfig);
  expect(stepResult).toMatchStepMetadata(stepConfig);
});

test('build-access-list-database-relationships', async () => {
  recording = setupProjectRecording({
    directory: __dirname,
    name: 'build-access-list-database-relationships',
  });

  const stepConfig = buildStepTestConfigForStep(
    Steps.BUILD_ACCESS_LIST_DATABASE_RELATIONSHIPS,
  );
  const stepResult = await executeStepWithDependencies(stepConfig);
  expect(stepResult).toMatchStepMetadata(stepConfig);
});
