/* tslint:disable */
/* eslint-disable */
import { GraphQLResolveInfo } from 'graphql';
/**
 * This file is auto-generated by graphql-schema-typescript
 * Please note that any changes in this file may be overwritten
 */
 

/*******************************
 *                             *
 *          TYPE DEFS          *
 *                             *
 *******************************/
export interface GQLQuery {
  me: GQLUser;
  myTeam: GQLTeam;
  allPlayers: Array<GQLPlayer>;
  leagueLeaders: Array<GQLLeagueLeader>;
}

export interface GQLUser {
  id: string;
  email: string;
  name: string;
  team: GQLTeam;
  leaguesEnrolled?: Array<GQLFantasyLeague>;
}

export interface GQLTeam {
  id: string;
  name: string;
  owner: GQLUser;
  players: Array<GQLPlayer>;
}

export interface GQLPlayer {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  position: string;
  currentTeam?: GQLNbaTeam;
  imageSrc?: string;
  stats?: Array<GQLStat>;
  gameCountThisWeek?: number;
  injury?: GQLInjury;
}

export interface GQLNbaTeam {
  id: string;
  abbreviation: string;
}

export interface GQLStat {
  category: string;
  value: number;
}

export interface GQLInjury {
  playingProbability: string;
  description: string;
}

export interface GQLFantasyLeague {
  id: string;
  name: string;
  admin: GQLUser;
  teams: Array<GQLTeam>;
}

export interface GQLLeagueLeader {
  stat: string;
  leaders: Array<GQLPlayer>;
}

export interface GQLMutation {
  register?: GQLAuthPayLoad;
  login?: GQLAuthPayLoad;
  saveTeam?: GQLTeam;
  createFantasyLeague?: boolean;
  addFantasyLeagueMember?: boolean;
  removeFantasyLeagueMember?: boolean;
}

export interface GQLAuthPayLoad {
  token?: string;
  user?: GQLUser;
}

/*********************************
 *                               *
 *         TYPE RESOLVERS        *
 *                               *
 *********************************/
/**
 * This interface define the shape of your resolver
 * Note that this type is designed to be compatible with graphql-tools resolvers
 * However, you can still use other generated interfaces to make your resolver type-safed
 */
export interface GQLResolver {
  Query?: GQLQueryTypeResolver;
  User?: GQLUserTypeResolver;
  Team?: GQLTeamTypeResolver;
  Player?: GQLPlayerTypeResolver;
  NbaTeam?: GQLNbaTeamTypeResolver;
  Stat?: GQLStatTypeResolver;
  Injury?: GQLInjuryTypeResolver;
  FantasyLeague?: GQLFantasyLeagueTypeResolver;
  LeagueLeader?: GQLLeagueLeaderTypeResolver;
  Mutation?: GQLMutationTypeResolver;
  AuthPayLoad?: GQLAuthPayLoadTypeResolver;
}
export interface GQLQueryTypeResolver<TParent = any> {
  me?: QueryToMeResolver<TParent>;
  myTeam?: QueryToMyTeamResolver<TParent>;
  allPlayers?: QueryToAllPlayersResolver<TParent>;
  leagueLeaders?: QueryToLeagueLeadersResolver<TParent>;
}

export interface QueryToMeResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface QueryToMyTeamResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface QueryToAllPlayersArgs {
  filter?: string;
}
export interface QueryToAllPlayersResolver<TParent = any, TResult = any> {
  (parent: TParent, args: QueryToAllPlayersArgs, context: any, info: GraphQLResolveInfo): TResult;
}

export interface QueryToLeagueLeadersArgs {
  timeFrame?: string;
}
export interface QueryToLeagueLeadersResolver<TParent = any, TResult = any> {
  (parent: TParent, args: QueryToLeagueLeadersArgs, context: any, info: GraphQLResolveInfo): TResult;
}

export interface GQLUserTypeResolver<TParent = any> {
  id?: UserToIdResolver<TParent>;
  email?: UserToEmailResolver<TParent>;
  name?: UserToNameResolver<TParent>;
  team?: UserToTeamResolver<TParent>;
  leaguesEnrolled?: UserToLeaguesEnrolledResolver<TParent>;
}

export interface UserToIdResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface UserToEmailResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface UserToNameResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface UserToTeamResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface UserToLeaguesEnrolledResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface GQLTeamTypeResolver<TParent = any> {
  id?: TeamToIdResolver<TParent>;
  name?: TeamToNameResolver<TParent>;
  owner?: TeamToOwnerResolver<TParent>;
  players?: TeamToPlayersResolver<TParent>;
}

export interface TeamToIdResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface TeamToNameResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface TeamToOwnerResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface TeamToPlayersResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface GQLPlayerTypeResolver<TParent = any> {
  id?: PlayerToIdResolver<TParent>;
  firstName?: PlayerToFirstNameResolver<TParent>;
  lastName?: PlayerToLastNameResolver<TParent>;
  fullName?: PlayerToFullNameResolver<TParent>;
  position?: PlayerToPositionResolver<TParent>;
  currentTeam?: PlayerToCurrentTeamResolver<TParent>;
  imageSrc?: PlayerToImageSrcResolver<TParent>;
  stats?: PlayerToStatsResolver<TParent>;
  gameCountThisWeek?: PlayerToGameCountThisWeekResolver<TParent>;
  injury?: PlayerToInjuryResolver<TParent>;
}

export interface PlayerToIdResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface PlayerToFirstNameResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface PlayerToLastNameResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface PlayerToFullNameResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface PlayerToPositionResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface PlayerToCurrentTeamResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface PlayerToImageSrcResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface PlayerToStatsArgs {
  timeFrame?: string;
}
export interface PlayerToStatsResolver<TParent = any, TResult = any> {
  (parent: TParent, args: PlayerToStatsArgs, context: any, info: GraphQLResolveInfo): TResult;
}

export interface PlayerToGameCountThisWeekResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface PlayerToInjuryResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface GQLNbaTeamTypeResolver<TParent = any> {
  id?: NbaTeamToIdResolver<TParent>;
  abbreviation?: NbaTeamToAbbreviationResolver<TParent>;
}

export interface NbaTeamToIdResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface NbaTeamToAbbreviationResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface GQLStatTypeResolver<TParent = any> {
  category?: StatToCategoryResolver<TParent>;
  value?: StatToValueResolver<TParent>;
}

export interface StatToCategoryResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface StatToValueResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface GQLInjuryTypeResolver<TParent = any> {
  playingProbability?: InjuryToPlayingProbabilityResolver<TParent>;
  description?: InjuryToDescriptionResolver<TParent>;
}

export interface InjuryToPlayingProbabilityResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface InjuryToDescriptionResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface GQLFantasyLeagueTypeResolver<TParent = any> {
  id?: FantasyLeagueToIdResolver<TParent>;
  name?: FantasyLeagueToNameResolver<TParent>;
  admin?: FantasyLeagueToAdminResolver<TParent>;
  teams?: FantasyLeagueToTeamsResolver<TParent>;
}

export interface FantasyLeagueToIdResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface FantasyLeagueToNameResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface FantasyLeagueToAdminResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface FantasyLeagueToTeamsResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface GQLLeagueLeaderTypeResolver<TParent = any> {
  stat?: LeagueLeaderToStatResolver<TParent>;
  leaders?: LeagueLeaderToLeadersResolver<TParent>;
}

export interface LeagueLeaderToStatResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface LeagueLeaderToLeadersResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface GQLMutationTypeResolver<TParent = any> {
  register?: MutationToRegisterResolver<TParent>;
  login?: MutationToLoginResolver<TParent>;
  saveTeam?: MutationToSaveTeamResolver<TParent>;
  createFantasyLeague?: MutationToCreateFantasyLeagueResolver<TParent>;
  addFantasyLeagueMember?: MutationToAddFantasyLeagueMemberResolver<TParent>;
  removeFantasyLeagueMember?: MutationToRemoveFantasyLeagueMemberResolver<TParent>;
}

export interface MutationToRegisterArgs {
  name: string;
  email: string;
  password: string;
}
export interface MutationToRegisterResolver<TParent = any, TResult = any> {
  (parent: TParent, args: MutationToRegisterArgs, context: any, info: GraphQLResolveInfo): TResult;
}

export interface MutationToLoginArgs {
  email: string;
  password: string;
}
export interface MutationToLoginResolver<TParent = any, TResult = any> {
  (parent: TParent, args: MutationToLoginArgs, context: any, info: GraphQLResolveInfo): TResult;
}

export interface MutationToSaveTeamArgs {
  playerIds: Array<string>;
}
export interface MutationToSaveTeamResolver<TParent = any, TResult = any> {
  (parent: TParent, args: MutationToSaveTeamArgs, context: any, info: GraphQLResolveInfo): TResult;
}

export interface MutationToCreateFantasyLeagueArgs {
  name: string;
}
export interface MutationToCreateFantasyLeagueResolver<TParent = any, TResult = any> {
  (parent: TParent, args: MutationToCreateFantasyLeagueArgs, context: any, info: GraphQLResolveInfo): TResult;
}

export interface MutationToAddFantasyLeagueMemberArgs {
  leagueId: string;
  teamId: string;
}
export interface MutationToAddFantasyLeagueMemberResolver<TParent = any, TResult = any> {
  (parent: TParent, args: MutationToAddFantasyLeagueMemberArgs, context: any, info: GraphQLResolveInfo): TResult;
}

export interface MutationToRemoveFantasyLeagueMemberArgs {
  leagueId: string;
  teamId: string;
}
export interface MutationToRemoveFantasyLeagueMemberResolver<TParent = any, TResult = any> {
  (parent: TParent, args: MutationToRemoveFantasyLeagueMemberArgs, context: any, info: GraphQLResolveInfo): TResult;
}

export interface GQLAuthPayLoadTypeResolver<TParent = any> {
  token?: AuthPayLoadToTokenResolver<TParent>;
  user?: AuthPayLoadToUserResolver<TParent>;
}

export interface AuthPayLoadToTokenResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface AuthPayLoadToUserResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}
