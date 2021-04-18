import { areAnyEnvVarsMissing, EnvironmentVariable, getEnvVar } from '../environmentVariables';

describe('environmentVariables', () => {
  afterEach(() => {
    process.env = {};
  });

  describe('getEnvVar', () => {
    it('returns the value when it is defined', () => {
      process.env[EnvironmentVariable.MongoCluster] = 'something';
      expect(getEnvVar(EnvironmentVariable.MongoCluster)).toEqual('something');
    });

    it('returns an empty string when it is not defined', () => {
      expect(getEnvVar(EnvironmentVariable.MongoCluster)).toEqual('');
    });
  });
  describe('areAnyEnvVarsMissing', () => {
    beforeEach(() => {
      Object.values(EnvironmentVariable).forEach((variable) => (process.env[variable] = 'something'));
    });

    it('returns false when there are no environment variables missing', () => {
      expect(areAnyEnvVarsMissing()).toBeFalsy();
    });

    it('returns true when an environment variable is an empty string', () => {
      process.env[EnvironmentVariable.MongoCluster] = '';
      expect(areAnyEnvVarsMissing()).toBeTruthy();
    });

    it('returns true when an environment variable is undefined', () => {
      process.env[EnvironmentVariable.MongoCluster] = undefined;
      expect(areAnyEnvVarsMissing()).toBeTruthy();
    });
  });
});
