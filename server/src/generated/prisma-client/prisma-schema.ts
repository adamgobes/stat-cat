// Code generated by Prisma (prisma@1.34.10). DO NOT EDIT.
  // Please don't change this file manually but run `prisma generate` to update it.
  // For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

export const typeDefs = /* GraphQL */ `type AggregateFantasyLeague {
  count: Int!
}

type AggregateTeam {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  count: Long!
}

type FantasyLeague {
  id: ID!
  name: String!
  teams(where: TeamWhereInput, orderBy: TeamOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Team!]
  espnId: ID!
}

type FantasyLeagueConnection {
  pageInfo: PageInfo!
  edges: [FantasyLeagueEdge]!
  aggregate: AggregateFantasyLeague!
}

input FantasyLeagueCreateInput {
  id: ID
  name: String!
  teams: TeamCreateManyWithoutLeagueInput
  espnId: ID!
}

input FantasyLeagueCreateOneWithoutTeamsInput {
  create: FantasyLeagueCreateWithoutTeamsInput
  connect: FantasyLeagueWhereUniqueInput
}

input FantasyLeagueCreateWithoutTeamsInput {
  id: ID
  name: String!
  espnId: ID!
}

type FantasyLeagueEdge {
  node: FantasyLeague!
  cursor: String!
}

enum FantasyLeagueOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  espnId_ASC
  espnId_DESC
}

type FantasyLeaguePreviousValues {
  id: ID!
  name: String!
  espnId: ID!
}

type FantasyLeagueSubscriptionPayload {
  mutation: MutationType!
  node: FantasyLeague
  updatedFields: [String!]
  previousValues: FantasyLeaguePreviousValues
}

input FantasyLeagueSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: FantasyLeagueWhereInput
  AND: [FantasyLeagueSubscriptionWhereInput!]
  OR: [FantasyLeagueSubscriptionWhereInput!]
  NOT: [FantasyLeagueSubscriptionWhereInput!]
}

input FantasyLeagueUpdateInput {
  name: String
  teams: TeamUpdateManyWithoutLeagueInput
  espnId: ID
}

input FantasyLeagueUpdateManyMutationInput {
  name: String
  espnId: ID
}

input FantasyLeagueUpdateOneWithoutTeamsInput {
  create: FantasyLeagueCreateWithoutTeamsInput
  update: FantasyLeagueUpdateWithoutTeamsDataInput
  upsert: FantasyLeagueUpsertWithoutTeamsInput
  delete: Boolean
  disconnect: Boolean
  connect: FantasyLeagueWhereUniqueInput
}

input FantasyLeagueUpdateWithoutTeamsDataInput {
  name: String
  espnId: ID
}

input FantasyLeagueUpsertWithoutTeamsInput {
  update: FantasyLeagueUpdateWithoutTeamsDataInput!
  create: FantasyLeagueCreateWithoutTeamsInput!
}

input FantasyLeagueWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  teams_every: TeamWhereInput
  teams_some: TeamWhereInput
  teams_none: TeamWhereInput
  espnId: ID
  espnId_not: ID
  espnId_in: [ID!]
  espnId_not_in: [ID!]
  espnId_lt: ID
  espnId_lte: ID
  espnId_gt: ID
  espnId_gte: ID
  espnId_contains: ID
  espnId_not_contains: ID
  espnId_starts_with: ID
  espnId_not_starts_with: ID
  espnId_ends_with: ID
  espnId_not_ends_with: ID
  AND: [FantasyLeagueWhereInput!]
  OR: [FantasyLeagueWhereInput!]
  NOT: [FantasyLeagueWhereInput!]
}

input FantasyLeagueWhereUniqueInput {
  id: ID
  espnId: ID
}

scalar Long

type Mutation {
  createFantasyLeague(data: FantasyLeagueCreateInput!): FantasyLeague!
  updateFantasyLeague(data: FantasyLeagueUpdateInput!, where: FantasyLeagueWhereUniqueInput!): FantasyLeague
  updateManyFantasyLeagues(data: FantasyLeagueUpdateManyMutationInput!, where: FantasyLeagueWhereInput): BatchPayload!
  upsertFantasyLeague(where: FantasyLeagueWhereUniqueInput!, create: FantasyLeagueCreateInput!, update: FantasyLeagueUpdateInput!): FantasyLeague!
  deleteFantasyLeague(where: FantasyLeagueWhereUniqueInput!): FantasyLeague
  deleteManyFantasyLeagues(where: FantasyLeagueWhereInput): BatchPayload!
  createTeam(data: TeamCreateInput!): Team!
  updateTeam(data: TeamUpdateInput!, where: TeamWhereUniqueInput!): Team
  updateManyTeams(data: TeamUpdateManyMutationInput!, where: TeamWhereInput): BatchPayload!
  upsertTeam(where: TeamWhereUniqueInput!, create: TeamCreateInput!, update: TeamUpdateInput!): Team!
  deleteTeam(where: TeamWhereUniqueInput!): Team
  deleteManyTeams(where: TeamWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  fantasyLeague(where: FantasyLeagueWhereUniqueInput!): FantasyLeague
  fantasyLeagues(where: FantasyLeagueWhereInput, orderBy: FantasyLeagueOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [FantasyLeague]!
  fantasyLeaguesConnection(where: FantasyLeagueWhereInput, orderBy: FantasyLeagueOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): FantasyLeagueConnection!
  team(where: TeamWhereUniqueInput!): Team
  teams(where: TeamWhereInput, orderBy: TeamOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Team]!
  teamsConnection(where: TeamWhereInput, orderBy: TeamOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TeamConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

type Subscription {
  fantasyLeague(where: FantasyLeagueSubscriptionWhereInput): FantasyLeagueSubscriptionPayload
  team(where: TeamSubscriptionWhereInput): TeamSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type Team {
  id: ID!
  name: String!
  owner: User!
  players: [ID!]!
  espnId: ID
  league: FantasyLeague
}

type TeamConnection {
  pageInfo: PageInfo!
  edges: [TeamEdge]!
  aggregate: AggregateTeam!
}

input TeamCreateInput {
  id: ID
  name: String!
  owner: UserCreateOneWithoutTeamsInput!
  players: TeamCreateplayersInput
  espnId: ID
  league: FantasyLeagueCreateOneWithoutTeamsInput
}

input TeamCreateManyWithoutLeagueInput {
  create: [TeamCreateWithoutLeagueInput!]
  connect: [TeamWhereUniqueInput!]
}

input TeamCreateManyWithoutOwnerInput {
  create: [TeamCreateWithoutOwnerInput!]
  connect: [TeamWhereUniqueInput!]
}

input TeamCreateplayersInput {
  set: [ID!]
}

input TeamCreateWithoutLeagueInput {
  id: ID
  name: String!
  owner: UserCreateOneWithoutTeamsInput!
  players: TeamCreateplayersInput
  espnId: ID
}

input TeamCreateWithoutOwnerInput {
  id: ID
  name: String!
  players: TeamCreateplayersInput
  espnId: ID
  league: FantasyLeagueCreateOneWithoutTeamsInput
}

type TeamEdge {
  node: Team!
  cursor: String!
}

enum TeamOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  espnId_ASC
  espnId_DESC
}

type TeamPreviousValues {
  id: ID!
  name: String!
  players: [ID!]!
  espnId: ID
}

input TeamScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  espnId: ID
  espnId_not: ID
  espnId_in: [ID!]
  espnId_not_in: [ID!]
  espnId_lt: ID
  espnId_lte: ID
  espnId_gt: ID
  espnId_gte: ID
  espnId_contains: ID
  espnId_not_contains: ID
  espnId_starts_with: ID
  espnId_not_starts_with: ID
  espnId_ends_with: ID
  espnId_not_ends_with: ID
  AND: [TeamScalarWhereInput!]
  OR: [TeamScalarWhereInput!]
  NOT: [TeamScalarWhereInput!]
}

type TeamSubscriptionPayload {
  mutation: MutationType!
  node: Team
  updatedFields: [String!]
  previousValues: TeamPreviousValues
}

input TeamSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: TeamWhereInput
  AND: [TeamSubscriptionWhereInput!]
  OR: [TeamSubscriptionWhereInput!]
  NOT: [TeamSubscriptionWhereInput!]
}

input TeamUpdateInput {
  name: String
  owner: UserUpdateOneRequiredWithoutTeamsInput
  players: TeamUpdateplayersInput
  espnId: ID
  league: FantasyLeagueUpdateOneWithoutTeamsInput
}

input TeamUpdateManyDataInput {
  name: String
  players: TeamUpdateplayersInput
  espnId: ID
}

input TeamUpdateManyMutationInput {
  name: String
  players: TeamUpdateplayersInput
  espnId: ID
}

input TeamUpdateManyWithoutLeagueInput {
  create: [TeamCreateWithoutLeagueInput!]
  delete: [TeamWhereUniqueInput!]
  connect: [TeamWhereUniqueInput!]
  set: [TeamWhereUniqueInput!]
  disconnect: [TeamWhereUniqueInput!]
  update: [TeamUpdateWithWhereUniqueWithoutLeagueInput!]
  upsert: [TeamUpsertWithWhereUniqueWithoutLeagueInput!]
  deleteMany: [TeamScalarWhereInput!]
  updateMany: [TeamUpdateManyWithWhereNestedInput!]
}

input TeamUpdateManyWithoutOwnerInput {
  create: [TeamCreateWithoutOwnerInput!]
  delete: [TeamWhereUniqueInput!]
  connect: [TeamWhereUniqueInput!]
  set: [TeamWhereUniqueInput!]
  disconnect: [TeamWhereUniqueInput!]
  update: [TeamUpdateWithWhereUniqueWithoutOwnerInput!]
  upsert: [TeamUpsertWithWhereUniqueWithoutOwnerInput!]
  deleteMany: [TeamScalarWhereInput!]
  updateMany: [TeamUpdateManyWithWhereNestedInput!]
}

input TeamUpdateManyWithWhereNestedInput {
  where: TeamScalarWhereInput!
  data: TeamUpdateManyDataInput!
}

input TeamUpdateplayersInput {
  set: [ID!]
}

input TeamUpdateWithoutLeagueDataInput {
  name: String
  owner: UserUpdateOneRequiredWithoutTeamsInput
  players: TeamUpdateplayersInput
  espnId: ID
}

input TeamUpdateWithoutOwnerDataInput {
  name: String
  players: TeamUpdateplayersInput
  espnId: ID
  league: FantasyLeagueUpdateOneWithoutTeamsInput
}

input TeamUpdateWithWhereUniqueWithoutLeagueInput {
  where: TeamWhereUniqueInput!
  data: TeamUpdateWithoutLeagueDataInput!
}

input TeamUpdateWithWhereUniqueWithoutOwnerInput {
  where: TeamWhereUniqueInput!
  data: TeamUpdateWithoutOwnerDataInput!
}

input TeamUpsertWithWhereUniqueWithoutLeagueInput {
  where: TeamWhereUniqueInput!
  update: TeamUpdateWithoutLeagueDataInput!
  create: TeamCreateWithoutLeagueInput!
}

input TeamUpsertWithWhereUniqueWithoutOwnerInput {
  where: TeamWhereUniqueInput!
  update: TeamUpdateWithoutOwnerDataInput!
  create: TeamCreateWithoutOwnerInput!
}

input TeamWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  owner: UserWhereInput
  espnId: ID
  espnId_not: ID
  espnId_in: [ID!]
  espnId_not_in: [ID!]
  espnId_lt: ID
  espnId_lte: ID
  espnId_gt: ID
  espnId_gte: ID
  espnId_contains: ID
  espnId_not_contains: ID
  espnId_starts_with: ID
  espnId_not_starts_with: ID
  espnId_ends_with: ID
  espnId_not_ends_with: ID
  league: FantasyLeagueWhereInput
  AND: [TeamWhereInput!]
  OR: [TeamWhereInput!]
  NOT: [TeamWhereInput!]
}

input TeamWhereUniqueInput {
  id: ID
}

type User {
  id: ID!
  name: String!
  email: String!
  password: String!
  teams(where: TeamWhereInput, orderBy: TeamOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Team!]
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  id: ID
  name: String!
  email: String!
  password: String!
  teams: TeamCreateManyWithoutOwnerInput
}

input UserCreateOneWithoutTeamsInput {
  create: UserCreateWithoutTeamsInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutTeamsInput {
  id: ID
  name: String!
  email: String!
  password: String!
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  email_ASC
  email_DESC
  password_ASC
  password_DESC
}

type UserPreviousValues {
  id: ID!
  name: String!
  email: String!
  password: String!
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateInput {
  name: String
  email: String
  password: String
  teams: TeamUpdateManyWithoutOwnerInput
}

input UserUpdateManyMutationInput {
  name: String
  email: String
  password: String
}

input UserUpdateOneRequiredWithoutTeamsInput {
  create: UserCreateWithoutTeamsInput
  update: UserUpdateWithoutTeamsDataInput
  upsert: UserUpsertWithoutTeamsInput
  connect: UserWhereUniqueInput
}

input UserUpdateWithoutTeamsDataInput {
  name: String
  email: String
  password: String
}

input UserUpsertWithoutTeamsInput {
  update: UserUpdateWithoutTeamsDataInput!
  create: UserCreateWithoutTeamsInput!
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  teams_every: TeamWhereInput
  teams_some: TeamWhereInput
  teams_none: TeamWhereInput
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  email: String
}
`