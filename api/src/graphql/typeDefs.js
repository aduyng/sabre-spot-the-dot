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

  input ScreenshotInput {
    projectId: ID!
    fileName: String!
    buildUrl: String
    buildNumber: PositiveInt
    buildName: String
    jobName: String!
    jobUrl: String
    commit: String
    branch: String
  }

  type Screenshot {
    id: ID!
    name: String!
    url: String
    size: BigInt
    diffUrl: String
    diffPercentage: PositiveInt
    status: String!
    createdAt: BigInt
    createdByUserId: ID
    updatedAt: BigInt
    updatedByUserId: ID
  }

  type Query {
    config: Config
    getSession: Session
    getApiKeys: [ApiKey]
    getProjects: [Project]
    getProject(id: ID!): Project
    getJobs(projectId: ID!): [Job]
  }

  type Mutation {
    ping: Int
    createApiKey(description: String!): ApiKey
    deleteApiKey(id: ID!): Int
    createScreenshotFromCI(screenshotInput: ScreenshotInput!): String
  }
`;
