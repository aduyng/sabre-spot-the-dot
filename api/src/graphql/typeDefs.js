const { gql } = require("apollo-server-cloud-functions");
require("graphql-scalars");

module.exports = gql`
  scalar Date
  scalar Time
  scalar DateTime
  scalar Timestamp
  scalar UtcOffset
  scalar Duration
  scalar ISO8601Duration
  scalar LocalDate
  scalar LocalTime
  scalar LocalEndTime
  scalar EmailAddress
  scalar NegativeFloat
  scalar NegativeInt
  scalar NonEmptyString
  scalar NonNegativeFloat
  scalar NonNegativeInt
  scalar NonPositiveFloat
  scalar NonPositiveInt
  scalar PhoneNumber
  scalar PositiveFloat
  scalar PositiveInt
  scalar PostalCode
  scalar UnsignedFloat
  scalar UnsignedInt
  scalar URL
  scalar BigInt
  scalar Long
  scalar Byte
  scalar UUID
  scalar GUID
  scalar Hexadecimal
  scalar HexColorCode
  scalar HSL
  scalar HSLA
  scalar IPv4
  scalar IPv6
  scalar ISBN
  scalar JWT
  scalar Latitude
  scalar Longitude
  scalar MAC
  scalar Port
  scalar RGB
  scalar RGBA
  scalar SafeInt
  scalar USCurrency
  scalar Currency
  scalar JSON
  scalar JSONObject
  scalar IBAN
  scalar ObjectID
  scalar Void
  scalar DID

  enum Status {
    STARTING
    PROCESSING
    COMPLETE
    ERROR
  }

  type Config {
    isDevelopment: Boolean!
    version: String!
    buildNumber: String!
    defaultPaginationRowsPerPage: [Int]!
  }

  type Session {
    user: User
    role: Role
  }

  type User {
    id: ID!
    uid: ID!
    name: String!
    email: EmailAddress!
    avatarUrl: String
  }

  type Role {
    id: ID!
    name: String!
  }

  type ApiKey {
    id: ID!
    description: String!
    expiresAt: BigInt
    plainTextKey: String
  }

  type Project {
    id: ID!
    name: String!
  }

  type Job {
    id: ID!
    name: String!
  }

  type Launch {
    id: ID!
    isGolden: Boolean!
    startedAt: BigInt!
    completedAt: BigInt
    status: Status!
  }

  type Screenshot {
    id: ID!
    name: String!
    url: String!
    size: String!
    diffUrl: String
    goldenUrl: String
    diffPercentage: Int
    status: Status!
    createdAt: BigInt!
  }

  type Crumbs {
    projectName: String!
    jobName: String
  }

  type Query {
    config: Config
    getSession: Session
    getApiKeys: [ApiKey]
    getProjects: [Project]
    getProject(id: ID!): Project
    getJobs(projectId: ID!): [Job]
    getJob(id: ID!): Job
    getLaunches(jobId: ID!): [Launch]
    getLaunch(id: ID!): Launch
    getScreenshots(launchId: ID!): [Screenshot]
    getCrumbs(projectId: ID!, jobId: ID): Crumbs
  }

  type Mutation {
    ping: Int
    createApiKey(description: String!): ApiKey
    deleteApiKey(id: ID!): Int
  }
`;
