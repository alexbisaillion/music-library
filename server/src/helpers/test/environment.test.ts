import { EnvironmentWrapper, EnvironmentVariable } from '../environment';

describe('environment-variables', () => {
  afterEach(() => {
    process.env = {};
  });

  describe('variables', () => {
    it('returns the value when it is defined', () => {
      process.env[EnvironmentVariable.MongoCluster] = 'something';
      const environment = new EnvironmentWrapper();
      expect(environment.variables.MONGO_CLUSTER).toEqual('something');
    });

    it('returns an empty string when it is not defined', () => {
      process.env[EnvironmentVariable.MongoCluster] = undefined;
      const environment = new EnvironmentWrapper();
      expect(environment.variables.MONGO_CLUSTER).toEqual('');
    });
  });
  describe('areAnyEnvVarsMissing', () => {
    const loadMockEnvironmentVariables = () =>
      Object.values(EnvironmentVariable).forEach((variable) => (process.env[variable] = 'something'));

    it('returns false when there are no environment variables missing', () => {
      loadMockEnvironmentVariables();
      const environment = new EnvironmentWrapper();
      expect(environment.areAnyVariablesMissing()).toBeFalsy();
    });

    it('returns true when an environment variable is an empty string', () => {
      loadMockEnvironmentVariables();
      process.env[EnvironmentVariable.MongoCluster] = '';
      const environment = new EnvironmentWrapper();
      expect(environment.areAnyVariablesMissing()).toBeTruthy();
    });

    it('returns true when an environment variable is undefined', () => {
      loadMockEnvironmentVariables();
      process.env[EnvironmentVariable.MongoCluster] = undefined;
      const environment = new EnvironmentWrapper();
      expect(environment.areAnyVariablesMissing()).toBeTruthy();
    });
  });
});
