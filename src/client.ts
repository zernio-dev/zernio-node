import packageJson from '../package.json';
import {
  client,
  activateSequence,
  activateWorkflow,
  addBroadcastRecipients,
  addConversionAssociations,
  addDiscordMemberRole,
  addMessageReaction,
  addTrackingTagSharedAccount,
  addUsersToAdAudience,
  addWhatsAppGroupParticipants,
  adjustConversions,
  appealSmsRegistration,
  approveWhatsAppGroupJoinRequests,
  archiveLeadForm,
  batchGetGoogleBusinessReviews,
  blockWhatsAppUsers,
  bookmarkPost,
  boostPost,
  bulkCreateContacts,
  bulkUpdateAdCampaignStatus,
  bulkUploadPosts,
  cancelBroadcast,
  cancelPhoneNumberPortIn,
  checkPhoneNumberAvailability,
  checkPhoneNumberPortability,
  checkWhatsAppNumberAvailability,
  clearContactFieldValue,
  completeGoogleBusinessVerification,
  completeTelegramConnect,
  completeWhatsAppPhoneSelection,
  configureTikTokAdsBrandIdentity,
  connectAds,
  connectBlueskyCredentials,
  connectWhatsAppCredentials,
  createAccountGroup,
  createAdAudience,
  createApiKey,
  createBroadcast,
  createCommentAutomation,
  createContact,
  createConversionDestination,
  createCtwaAd,
  createCustomField,
  createDiscordGuildRole,
  createDiscordScheduledEvent,
  createDiscordThread,
  createGoogleBusinessMedia,
  createGoogleBusinessPlaceAction,
  createInboxConversation,
  createInviteToken,
  createLeadForm,
  createPhoneNumberKycLink,
  createPhoneNumberPortIn,
  createPinterestBoard,
  createPost,
  createProfile,
  createQueueSlot,
  createSequence,
  createStandaloneAd,
  createTestLead,
  createTrackingTag,
  createVoiceCall,
  createVoiceWebSession,
  createWebhookSettings,
  createWhatsAppDataset,
  createWhatsAppFlow,
  createWhatsAppGroupChat,
  createWhatsAppGroupInviteLink,
  createWhatsAppNumberKycLink,
  createWhatsAppSandboxSession,
  createWhatsAppTemplate,
  createWorkflow,
  crosspostDiscordMessage,
  deactivateSmsRegistration,
  deleteAccount,
  deleteAccountGroup,
  deleteAd,
  deleteAdAudience,
  deleteAdCampaign,
  deleteApiKey,
  deleteBroadcast,
  deleteCommentAutomation,
  deleteContact,
  deleteConversionDestination,
  deleteCustomField,
  deleteDiscordGuildRole,
  deleteDiscordMessage,
  deleteDiscordScheduledEvent,
  deleteGoogleBusinessMedia,
  deleteGoogleBusinessPlaceAction,
  deleteGoogleBusinessReviewReply,
  deleteInboxComment,
  deleteInboxMessage,
  deleteInboxReviewReply,
  deleteInstagramIceBreakers,
  deleteMessengerMenu,
  deletePost,
  deleteProfile,
  deleteQueueSlot,
  deleteSequence,
  deleteTelegramCommands,
  deleteWebhookSettings,
  deleteWhatsAppFlow,
  deleteWhatsAppGroupChat,
  deleteWhatsAppSandboxSession,
  deleteWhatsAppTemplate,
  deleteWhatsappBusinessUsername,
  deleteWorkflow,
  deprecateWhatsAppFlow,
  dialVoiceWebCall,
  disableSmsOnNumber,
  disableVoiceOnNumber,
  disableWhatsAppCalling,
  disableWhatsAppCallingLegacy,
  duplicateAdCampaign,
  duplicateWorkflow,
  editDiscordGuildRole,
  editInboxComment,
  editInboxMessage,
  editPost,
  enableSmsOnNumber,
  enableVoiceOnNumber,
  enableWhatsAppCalling,
  enableWhatsAppCallingLegacy,
  endVoiceCall,
  enrollContacts,
  estimateAdReach,
  fetchGoogleBusinessVerificationOptions,
  followUser,
  getAccountHealth,
  getAd,
  getAdAnalytics,
  getAdAudience,
  getAdComments,
  getAdTrackingTags,
  getAdTree,
  getAdsTimeline,
  getAllAccountsHealth,
  getAnalytics,
  getBestTimeToPost,
  getBilling,
  getBroadcast,
  getCall,
  getCallRecording,
  getCallsUsage,
  getCampaignAnalytics,
  getCommentAutomation,
  getConnectUrl,
  getContact,
  getContactChannels,
  getContentDecay,
  getConversionDestination,
  getConversionMetrics,
  getConversionsQuality,
  getDailyMetrics,
  getDiscordChannels,
  getDiscordScheduledEvent,
  getDiscordSettings,
  getDsaDefaults,
  getDsaRecommendations,
  getFacebookPageInsights,
  getFacebookPages,
  getFacebookPostReactions,
  getFollowerStats,
  getGmbAttributeMetadata,
  getGmbLocations,
  getGoogleBusinessAttributes,
  getGoogleBusinessFoodMenus,
  getGoogleBusinessLocationDetails,
  getGoogleBusinessPerformance,
  getGoogleBusinessReviews,
  getGoogleBusinessSearchKeywords,
  getGoogleBusinessServices,
  getGoogleBusinessVerifications,
  getInboxConversation,
  getInboxConversationAnalytics,
  getInboxConversationMessages,
  getInboxHeatmap,
  getInboxPostComments,
  getInboxResponseTime,
  getInboxSourceBreakdown,
  getInboxTopAccounts,
  getInboxVolume,
  getInstagramAccountInsights,
  getInstagramDemographics,
  getInstagramFollowerHistory,
  getInstagramIceBreakers,
  getInstagramPublishingLimit,
  getInstagramStoryInsights,
  getLeadForm,
  getLinkedInAggregateAnalytics,
  getLinkedInBidPricing,
  getLinkedInMentions,
  getLinkedInOrgAggregateAnalytics,
  getLinkedInOrganizations,
  getLinkedInPostAnalytics,
  getLinkedInPostReactions,
  getLinkedInSupplyForecast,
  getMediaPresignedUrl,
  getMessengerMenu,
  getNextQueueSlot,
  getPendingOAuthData,
  getPhoneNumber,
  getPhoneNumberKycForm,
  getPhoneNumberRemediation,
  getPinterestBoards,
  getPost,
  getPostTimeline,
  getPostingFrequency,
  getProfile,
  getRedditFeed,
  getRedditFlairs,
  getRedditSubreddits,
  getSequence,
  getSmsRegistration,
  getSmsUsage,
  getSubredditRules,
  getTelegramCommands,
  getTelegramConnectStatus,
  getTikTokAccountInsights,
  getTikTokCreatorInfo,
  getTrackingTag,
  getTrackingTagStats,
  getUsage,
  getUsageStats,
  getUser,
  getVoiceCall,
  getVoiceCallEstimate,
  getVoiceCallRecording,
  getWebhookLogs,
  getWebhookSettings,
  getWhatsAppBlockStatus,
  getWhatsAppBlockedUsers,
  getWhatsAppBusinessProfile,
  getWhatsAppCall,
  getWhatsAppCallEstimate,
  getWhatsAppCallPermissions,
  getWhatsAppCallRecording,
  getWhatsAppCalling,
  getWhatsAppCallingConfig,
  getWhatsAppDataset,
  getWhatsAppDisplayName,
  getWhatsAppFlow,
  getWhatsAppFlowJson,
  getWhatsAppFlowPreview,
  getWhatsAppGroupChat,
  getWhatsAppLibraryTemplate,
  getWhatsAppNumberInfo,
  getWhatsAppNumberKycForm,
  getWhatsAppNumberRemediation,
  getWhatsAppPhoneNumber,
  getWhatsAppPhoneNumbers,
  getWhatsAppTemplate,
  getWhatsAppTemplates,
  getWhatsappBusinessUsername,
  getWhatsappBusinessUsernameSuggestions,
  getWorkflow,
  getWorkflowVersion,
  getXApiPricing,
  getYouTubeChannelInsights,
  getYouTubeDailyViews,
  getYouTubeDemographics,
  getYouTubeVideoRetention,
  getYoutubePlaylists,
  handleOAuthCallback,
  hideInboxComment,
  initiateTelegramConnect,
  initiateWhatsAppCall,
  likeInboxComment,
  listAccountGroups,
  listAccounts,
  listAdAccounts,
  listAdAudiences,
  listAdCampaigns,
  listAdCatalogProductSets,
  listAdCatalogs,
  listAds,
  listAdsBusinessCenters,
  listApiKeys,
  listBroadcastRecipients,
  listBroadcasts,
  listCalls,
  listCommentAutomationLogs,
  listCommentAutomations,
  listContacts,
  listConversionAssociations,
  listConversionDestinations,
  listCustomFields,
  listDiscordGuildMembers,
  listDiscordGuildRoles,
  listDiscordPinnedMessages,
  listDiscordScheduledEvents,
  listFacebookPages,
  listFormLeads,
  listGoogleBusinessLocations,
  listGoogleBusinessMedia,
  listGoogleBusinessPlaceActions,
  listInboxComments,
  listInboxConversationAnalytics,
  listInboxConversations,
  listInboxMentions,
  listInboxReviews,
  listInstagramStories,
  listLeadForms,
  listLeads,
  listLinkedInOrganizations,
  listLogs,
  listPhoneNumberCountries,
  listPhoneNumberPortIns,
  listPhoneNumbers,
  listPinterestBoardsForSelection,
  listPosts,
  listProfiles,
  listQueueSlots,
  listSequenceEnrollments,
  listSequences,
  listSmsOptOuts,
  listSmsRegistrations,
  listSnapchatProfiles,
  listTrackingTagSharedAccounts,
  listTrackingTags,
  listUsers,
  listVoiceCalls,
  listWhatsAppCalls,
  listWhatsAppConversions,
  listWhatsAppFlowResponses,
  listWhatsAppFlowVersions,
  listWhatsAppFlows,
  listWhatsAppGroupChats,
  listWhatsAppGroupJoinRequests,
  listWhatsAppNumberCountries,
  listWhatsAppPhoneNumbers,
  listWhatsAppSandboxSessions,
  listWorkflowExecutionEvents,
  listWorkflowExecutions,
  listWorkflowVersions,
  listWorkflows,
  lookupSmsNumber,
  markConversationRead,
  moveAccountToProfile,
  pauseSequence,
  pauseWorkflow,
  pinDiscordMessage,
  previewQueue,
  publishWhatsAppFlow,
  purchasePhoneNumber,
  purchaseWhatsAppPhoneNumber,
  rejectWhatsAppGroupJoinRequests,
  releasePhoneNumber,
  releaseWhatsAppPhoneNumber,
  remediatePhoneNumber,
  remediateWhatsAppNumber,
  removeBookmark,
  removeConversionAssociations,
  removeDiscordMemberRole,
  removeMessageReaction,
  removeTrackingTagSharedAccount,
  removeWhatsAppGroupParticipants,
  replyToGoogleBusinessReview,
  replyToInboxPost,
  replyToInboxReview,
  replyToMention,
  resendSmsRegistrationOtp,
  restoreWorkflowVersion,
  retryPost,
  retweetPost,
  reuseSmsRegistrationForNumber,
  reviewPhoneNumberKycPacket,
  scheduleBroadcast,
  searchAdInterests,
  searchAdTargeting,
  searchAvailablePhoneNumbers,
  searchAvailableWhatsAppNumbers,
  searchInboxConversations,
  searchReddit,
  selectFacebookPage,
  selectGoogleBusinessLocation,
  selectLinkedInOrganization,
  selectPinterestBoard,
  selectSnapchatProfile,
  sendBroadcast,
  sendConversions,
  sendDiscordDirectMessage,
  sendInboxMessage,
  sendPrivateReplyToComment,
  sendSms,
  sendTypingIndicator,
  sendWhatsAppConversion,
  sendWhatsAppFlowMessage,
  setCommentModeration,
  setContactFieldValue,
  setInstagramIceBreakers,
  setMessengerMenu,
  setRedditPostFlair,
  setTelegramCommands,
  setWhatsappBusinessUsername,
  shareSmsRegistration,
  startGoogleBusinessVerification,
  startSmsRegistration,
  submitPhoneNumberKyc,
  submitWhatsAppNumberKyc,
  syncExternalPosts,
  testWebhook,
  transferVoiceCall,
  triggerWorkflow,
  unblockWhatsAppUsers,
  undoRetweet,
  unenrollContact,
  unfollowUser,
  unhideInboxComment,
  unlikeInboxComment,
  unpinDiscordMessage,
  unpublishPost,
  updateAccount,
  updateAccountGroup,
  updateAd,
  updateAdAccount,
  updateAdAudience,
  updateAdCampaign,
  updateAdCampaignStatus,
  updateAdSet,
  updateAdSetStatus,
  updateAdStatus,
  updateAdTrackingTags,
  updateBroadcast,
  updateCommentAutomation,
  updateContact,
  updateConversionDestination,
  updateCustomField,
  updateDiscordScheduledEvent,
  updateDiscordSettings,
  updateFacebookPage,
  updateGmbLocation,
  updateGoogleBusinessAttributes,
  updateGoogleBusinessFoodMenus,
  updateGoogleBusinessLocationDetails,
  updateGoogleBusinessPlaceAction,
  updateGoogleBusinessServices,
  updateInboxConversation,
  updateLinkedInOrganization,
  updatePinterestBoards,
  updatePost,
  updatePostMetadata,
  updateProfile,
  updateQueueSlot,
  updateRedditSubreddits,
  updateSequence,
  updateTrackingTag,
  updateWebhookSettings,
  updateWhatsAppBusinessProfile,
  updateWhatsAppCalling,
  updateWhatsAppCallingLegacy,
  updateWhatsAppDisplayName,
  updateWhatsAppFlow,
  updateWhatsAppGroupChat,
  updateWhatsAppTemplate,
  updateWorkflow,
  updateYoutubeDefaultPlaylist,
  uploadMediaDirect,
  uploadPhoneNumberKycDocument,
  uploadPhoneNumberPortInDocument,
  uploadSmsOptInProof,
  uploadSmsOptInProofFile,
  uploadWhatsAppFlowJson,
  uploadWhatsAppNumberKycDocument,
  uploadWhatsAppProfilePhoto,
  validateMedia,
  validatePhoneNumberKycAddress,
  validatePost,
  validatePostLength,
  validateSubreddit,
  validateWhatsAppNumberKycAddress,
  verifySmsRegistrationOtp,
  voteRedditThing,
} from './generated/sdk.gen';

import { ZernioApiError, parseApiError } from './errors';
export interface ClientOptions {
  /**
   * API key for authentication. Defaults to process.env['ZERNIO_API_KEY'] (falls back to LATE_API_KEY).
   */
  apiKey?: string | undefined;

  /**
   * Override the default base URL for the API.
   * @default "https://zernio.com/api"
   */
  baseURL?: string | null | undefined;

  /**
   * The maximum amount of time (in milliseconds) that the client should wait for a response.
   * @default 60000
   */
  timeout?: number;

  /**
   * Default headers to include with every request.
   */
  defaultHeaders?: Record<string, string>;
}
/**
 * API Client for the Zernio API.
 *
 * @example
 * ```typescript
 * import Zernio from '@zernio/node';
 *
 * const zernio = new Zernio({
 *   apiKey: process.env['ZERNIO_API_KEY'], // This is the default and can be omitted
 * });
 *
 * async function main() {
 *   const post = await zernio.posts.create({
 *     body: {
 *       content: 'Hello from the Zernio SDK!',
 *       platforms: [{ platform: 'twitter', accountId: 'acc_123' }],
 *       publishNow: true,
 *     },
 *   });
 *   console.log(post.data);
 * }
 *
 * main();
 * ```
 */
export class Zernio {
  private _options: ClientOptions;

  /**
   * API key used for authentication.
   */
  apiKey: string;

  /**
   * Base URL for API requests.
   */
  baseURL: string;

  /**
   * validate API
   */
  validate = {
    validatePostLength: validatePostLength,
    validatePost: validatePost,
    validateMedia: validateMedia,
    validateSubreddit: validateSubreddit,
  };

  /**
   * Analytics API - Get performance metrics
   */
  analytics = {
    getAnalytics: getAnalytics,
    getYouTubeChannelInsights: getYouTubeChannelInsights,
    getLinkedInOrgAggregateAnalytics: getLinkedInOrgAggregateAnalytics,
    getTikTokAccountInsights: getTikTokAccountInsights,
    getYouTubeDailyViews: getYouTubeDailyViews,
    getYouTubeVideoRetention: getYouTubeVideoRetention,
    getFacebookPageInsights: getFacebookPageInsights,
    getInstagramAccountInsights: getInstagramAccountInsights,
    getInstagramFollowerHistory: getInstagramFollowerHistory,
    getInstagramDemographics: getInstagramDemographics,
    getYouTubeDemographics: getYouTubeDemographics,
    getDailyMetrics: getDailyMetrics,
    getBestTimeToPost: getBestTimeToPost,
    getContentDecay: getContentDecay,
    getPostingFrequency: getPostingFrequency,
    getPostTimeline: getPostTimeline,
    getGoogleBusinessPerformance: getGoogleBusinessPerformance,
    getGoogleBusinessSearchKeywords: getGoogleBusinessSearchKeywords,
    syncExternalPosts: syncExternalPosts,
    getLinkedInAggregateAnalytics: getLinkedInAggregateAnalytics,
    getLinkedInPostAnalytics: getLinkedInPostAnalytics,
    getLinkedInPostReactions: getLinkedInPostReactions,
    getFacebookPostReactions: getFacebookPostReactions,
  };

  /**
   * inboxanalytics API
   */
  inboxanalytics = {
    getInboxVolume: getInboxVolume,
    getInboxHeatmap: getInboxHeatmap,
    getInboxSourceBreakdown: getInboxSourceBreakdown,
    getInboxResponseTime: getInboxResponseTime,
    getInboxTopAccounts: getInboxTopAccounts,
    listInboxConversationAnalytics: listInboxConversationAnalytics,
    getInboxConversationAnalytics: getInboxConversationAnalytics,
  };

  /**
   * Account Groups API - Organize accounts into groups
   */
  accountGroups = {
    listAccountGroups: listAccountGroups,
    createAccountGroup: createAccountGroup,
    updateAccountGroup: updateAccountGroup,
    deleteAccountGroup: deleteAccountGroup,
  };

  /**
   * Media API - Upload and manage media files
   */
  media = {
    getMediaPresignedUrl: getMediaPresignedUrl,
  };

  /**
   * Reddit API - Search and feed
   */
  reddit = {
    searchReddit: searchReddit,
    getRedditFeed: getRedditFeed,
  };

  /**
   * Usage API - Get usage statistics
   */
  usage = {
    getBilling: getBilling,
    getXApiPricing: getXApiPricing,
    getUsage: getUsage,
    getUsageStats: getUsageStats,
    getCallsUsage: getCallsUsage,
    getSmsUsage: getSmsUsage,
  };

  /**
   * Posts API - Create, schedule, and manage social media posts
   */
  posts = {
    listPosts: listPosts,
    createPost: createPost,
    getPost: getPost,
    updatePost: updatePost,
    deletePost: deletePost,
    bulkUploadPosts: bulkUploadPosts,
    retryPost: retryPost,
    unpublishPost: unpublishPost,
    editPost: editPost,
    updatePostMetadata: updatePostMetadata,
  };

  /**
   * Users API - User management
   */
  users = {
    listUsers: listUsers,
    getUser: getUser,
  };

  /**
   * Profiles API - Manage workspace profiles
   */
  profiles = {
    listProfiles: listProfiles,
    createProfile: createProfile,
    getProfile: getProfile,
    updateProfile: updateProfile,
    deleteProfile: deleteProfile,
  };

  /**
   * Accounts API - Manage connected social media accounts
   */
  accounts = {
    listAccounts: listAccounts,
    getFollowerStats: getFollowerStats,
    updateAccount: updateAccount,
    moveAccountToProfile: moveAccountToProfile,
    deleteAccount: deleteAccount,
    getAllAccountsHealth: getAllAccountsHealth,
    getAccountHealth: getAccountHealth,
    getTikTokCreatorInfo: getTikTokCreatorInfo,
    getGoogleBusinessReviews: getGoogleBusinessReviews,
    batchGetGoogleBusinessReviews: batchGetGoogleBusinessReviews,
    replyToGoogleBusinessReview: replyToGoogleBusinessReview,
    deleteGoogleBusinessReviewReply: deleteGoogleBusinessReviewReply,
    getLinkedInMentions: getLinkedInMentions,
  };

  /**
   * API Keys API - Manage API keys
   */
  apiKeys = {
    listApiKeys: listApiKeys,
    createApiKey: createApiKey,
    deleteApiKey: deleteApiKey,
  };

  /**
   * Invites API - Team invitations
   */
  invites = {
    createInviteToken: createInviteToken,
  };

  /**
   * Connect API - OAuth connection flows
   */
  connect = {
    getConnectUrl: getConnectUrl,
    handleOAuthCallback: handleOAuthCallback,
    connectAds: connectAds,
    configureTikTokAdsBrandIdentity: configureTikTokAdsBrandIdentity,
    getPendingOAuthData: getPendingOAuthData,
    connectWhatsAppCredentials: connectWhatsAppCredentials,
    listWhatsAppPhoneNumbers: listWhatsAppPhoneNumbers,
    completeWhatsAppPhoneSelection: completeWhatsAppPhoneSelection,
    getFacebookPages: getFacebookPages,
    updateFacebookPage: updateFacebookPage,
    getLinkedInOrganizations: getLinkedInOrganizations,
    updateLinkedInOrganization: updateLinkedInOrganization,
    getPinterestBoards: getPinterestBoards,
    updatePinterestBoards: updatePinterestBoards,
    createPinterestBoard: createPinterestBoard,
    getYoutubePlaylists: getYoutubePlaylists,
    updateYoutubeDefaultPlaylist: updateYoutubeDefaultPlaylist,
    getGmbLocations: getGmbLocations,
    updateGmbLocation: updateGmbLocation,
    getRedditSubreddits: getRedditSubreddits,
    updateRedditSubreddits: updateRedditSubreddits,
    getSubredditRules: getSubredditRules,
    voteRedditThing: voteRedditThing,
    getRedditFlairs: getRedditFlairs,
    setRedditPostFlair: setRedditPostFlair,
    facebook: {
      listFacebookPages: listFacebookPages,
      selectFacebookPage: selectFacebookPage,
    },
    googleBusiness: {
      listGoogleBusinessLocations: listGoogleBusinessLocations,
      selectGoogleBusinessLocation: selectGoogleBusinessLocation,
    },
    linkedin: {
      listLinkedInOrganizations: listLinkedInOrganizations,
      selectLinkedInOrganization: selectLinkedInOrganization,
    },
    pinterest: {
      listPinterestBoardsForSelection: listPinterestBoardsForSelection,
      selectPinterestBoard: selectPinterestBoard,
    },
    snapchat: {
      listSnapchatProfiles: listSnapchatProfiles,
      selectSnapchatProfile: selectSnapchatProfile,
    },
    bluesky: {
      connectBlueskyCredentials: connectBlueskyCredentials,
    },
    telegram: {
      getTelegramConnectStatus: getTelegramConnectStatus,
      initiateTelegramConnect: initiateTelegramConnect,
      completeTelegramConnect: completeTelegramConnect,
    },
  };

  /**
   * gmbverifications API
   */
  gmbverifications = {
    getGoogleBusinessVerifications: getGoogleBusinessVerifications,
    startGoogleBusinessVerification: startGoogleBusinessVerification,
    fetchGoogleBusinessVerificationOptions: fetchGoogleBusinessVerificationOptions,
    completeGoogleBusinessVerification: completeGoogleBusinessVerification,
  };

  /**
   * gmbfoodmenus API
   */
  gmbfoodmenus = {
    getGoogleBusinessFoodMenus: getGoogleBusinessFoodMenus,
    updateGoogleBusinessFoodMenus: updateGoogleBusinessFoodMenus,
  };

  /**
   * gmblocationdetails API
   */
  gmblocationdetails = {
    getGoogleBusinessLocationDetails: getGoogleBusinessLocationDetails,
    updateGoogleBusinessLocationDetails: updateGoogleBusinessLocationDetails,
  };

  /**
   * gmbmedia API
   */
  gmbmedia = {
    listGoogleBusinessMedia: listGoogleBusinessMedia,
    createGoogleBusinessMedia: createGoogleBusinessMedia,
    deleteGoogleBusinessMedia: deleteGoogleBusinessMedia,
  };

  /**
   * gmbattributes API
   */
  gmbattributes = {
    getGmbAttributeMetadata: getGmbAttributeMetadata,
    getGoogleBusinessAttributes: getGoogleBusinessAttributes,
    updateGoogleBusinessAttributes: updateGoogleBusinessAttributes,
  };

  /**
   * gmbplaceactions API
   */
  gmbplaceactions = {
    listGoogleBusinessPlaceActions: listGoogleBusinessPlaceActions,
    createGoogleBusinessPlaceAction: createGoogleBusinessPlaceAction,
    deleteGoogleBusinessPlaceAction: deleteGoogleBusinessPlaceAction,
    updateGoogleBusinessPlaceAction: updateGoogleBusinessPlaceAction,
  };

  /**
   * gmbservices API
   */
  gmbservices = {
    getGoogleBusinessServices: getGoogleBusinessServices,
    updateGoogleBusinessServices: updateGoogleBusinessServices,
  };

  /**
   * instagram API
   */
  instagram = {
    listInstagramStories: listInstagramStories,
    getInstagramPublishingLimit: getInstagramPublishingLimit,
    getInstagramStoryInsights: getInstagramStoryInsights,
  };

  /**
   * discord API
   */
  discord = {
    getDiscordSettings: getDiscordSettings,
    updateDiscordSettings: updateDiscordSettings,
    getDiscordChannels: getDiscordChannels,
    sendDiscordDirectMessage: sendDiscordDirectMessage,
    listDiscordGuildRoles: listDiscordGuildRoles,
    createDiscordGuildRole: createDiscordGuildRole,
    editDiscordGuildRole: editDiscordGuildRole,
    deleteDiscordGuildRole: deleteDiscordGuildRole,
    listDiscordGuildMembers: listDiscordGuildMembers,
    addDiscordMemberRole: addDiscordMemberRole,
    removeDiscordMemberRole: removeDiscordMemberRole,
    deleteDiscordMessage: deleteDiscordMessage,
    crosspostDiscordMessage: crosspostDiscordMessage,
    createDiscordThread: createDiscordThread,
    listDiscordPinnedMessages: listDiscordPinnedMessages,
    pinDiscordMessage: pinDiscordMessage,
    unpinDiscordMessage: unpinDiscordMessage,
    listDiscordScheduledEvents: listDiscordScheduledEvents,
    createDiscordScheduledEvent: createDiscordScheduledEvent,
    getDiscordScheduledEvent: getDiscordScheduledEvent,
    updateDiscordScheduledEvent: updateDiscordScheduledEvent,
    deleteDiscordScheduledEvent: deleteDiscordScheduledEvent,
  };

  /**
   * Queue API - Manage posting queue
   */
  queue = {
    listQueueSlots: listQueueSlots,
    createQueueSlot: createQueueSlot,
    updateQueueSlot: updateQueueSlot,
    deleteQueueSlot: deleteQueueSlot,
    previewQueue: previewQueue,
    getNextQueueSlot: getNextQueueSlot,
  };

  /**
   * Webhooks API - Configure event webhooks
   */
  webhooks = {
    getWebhookSettings: getWebhookSettings,
    createWebhookSettings: createWebhookSettings,
    updateWebhookSettings: updateWebhookSettings,
    deleteWebhookSettings: deleteWebhookSettings,
    getWebhookLogs: getWebhookLogs,
    testWebhook: testWebhook,
  };

  /**
   * Logs API - Publishing logs
   */
  logs = {
    listLogs: listLogs,
  };

  /**
   * messages API
   */
  messages = {
    listInboxConversations: listInboxConversations,
    createInboxConversation: createInboxConversation,
    searchInboxConversations: searchInboxConversations,
    getInboxConversation: getInboxConversation,
    updateInboxConversation: updateInboxConversation,
    getInboxConversationMessages: getInboxConversationMessages,
    sendInboxMessage: sendInboxMessage,
    editInboxMessage: editInboxMessage,
    deleteInboxMessage: deleteInboxMessage,
    sendTypingIndicator: sendTypingIndicator,
    markConversationRead: markConversationRead,
    addMessageReaction: addMessageReaction,
    removeMessageReaction: removeMessageReaction,
    uploadMediaDirect: uploadMediaDirect,
  };

  /**
   * accountsettings API
   */
  accountsettings = {
    getMessengerMenu: getMessengerMenu,
    setMessengerMenu: setMessengerMenu,
    deleteMessengerMenu: deleteMessengerMenu,
    getInstagramIceBreakers: getInstagramIceBreakers,
    setInstagramIceBreakers: setInstagramIceBreakers,
    deleteInstagramIceBreakers: deleteInstagramIceBreakers,
    getTelegramCommands: getTelegramCommands,
    setTelegramCommands: setTelegramCommands,
    deleteTelegramCommands: deleteTelegramCommands,
  };

  /**
   * comments API
   */
  comments = {
    listInboxComments: listInboxComments,
    getInboxPostComments: getInboxPostComments,
    replyToInboxPost: replyToInboxPost,
    deleteInboxComment: deleteInboxComment,
    editInboxComment: editInboxComment,
    setCommentModeration: setCommentModeration,
    hideInboxComment: hideInboxComment,
    unhideInboxComment: unhideInboxComment,
    likeInboxComment: likeInboxComment,
    unlikeInboxComment: unlikeInboxComment,
    sendPrivateReplyToComment: sendPrivateReplyToComment,
  };

  /**
   * twitterengagement API
   */
  twitterengagement = {
    retweetPost: retweetPost,
    undoRetweet: undoRetweet,
    bookmarkPost: bookmarkPost,
    removeBookmark: removeBookmark,
    followUser: followUser,
    unfollowUser: unfollowUser,
  };

  /**
   * mentions API
   */
  mentions = {
    listInboxMentions: listInboxMentions,
    replyToMention: replyToMention,
  };

  /**
   * reviews API
   */
  reviews = {
    listInboxReviews: listInboxReviews,
    replyToInboxReview: replyToInboxReview,
    deleteInboxReviewReply: deleteInboxReviewReply,
  };

  /**
   * whatsapp API
   */
  whatsapp = {
    getWhatsAppTemplates: getWhatsAppTemplates,
    createWhatsAppTemplate: createWhatsAppTemplate,
    getWhatsAppTemplate: getWhatsAppTemplate,
    updateWhatsAppTemplate: updateWhatsAppTemplate,
    deleteWhatsAppTemplate: deleteWhatsAppTemplate,
    getWhatsAppBusinessProfile: getWhatsAppBusinessProfile,
    updateWhatsAppBusinessProfile: updateWhatsAppBusinessProfile,
    uploadWhatsAppProfilePhoto: uploadWhatsAppProfilePhoto,
    getWhatsAppDisplayName: getWhatsAppDisplayName,
    updateWhatsAppDisplayName: updateWhatsAppDisplayName,
    getWhatsappBusinessUsername: getWhatsappBusinessUsername,
    setWhatsappBusinessUsername: setWhatsappBusinessUsername,
    deleteWhatsappBusinessUsername: deleteWhatsappBusinessUsername,
    getWhatsappBusinessUsernameSuggestions: getWhatsappBusinessUsernameSuggestions,
    getWhatsAppBlockStatus: getWhatsAppBlockStatus,
    getWhatsAppBlockedUsers: getWhatsAppBlockedUsers,
    blockWhatsAppUsers: blockWhatsAppUsers,
    unblockWhatsAppUsers: unblockWhatsAppUsers,
    getWhatsAppDataset: getWhatsAppDataset,
    createWhatsAppDataset: createWhatsAppDataset,
    listWhatsAppGroupChats: listWhatsAppGroupChats,
    createWhatsAppGroupChat: createWhatsAppGroupChat,
    getWhatsAppGroupChat: getWhatsAppGroupChat,
    updateWhatsAppGroupChat: updateWhatsAppGroupChat,
    deleteWhatsAppGroupChat: deleteWhatsAppGroupChat,
    addWhatsAppGroupParticipants: addWhatsAppGroupParticipants,
    removeWhatsAppGroupParticipants: removeWhatsAppGroupParticipants,
    createWhatsAppGroupInviteLink: createWhatsAppGroupInviteLink,
    listWhatsAppGroupJoinRequests: listWhatsAppGroupJoinRequests,
    approveWhatsAppGroupJoinRequests: approveWhatsAppGroupJoinRequests,
    rejectWhatsAppGroupJoinRequests: rejectWhatsAppGroupJoinRequests,
    listWhatsAppConversions: listWhatsAppConversions,
    sendWhatsAppConversion: sendWhatsAppConversion,
  };

  /**
   * whatsappcalling API
   */
  whatsappcalling = {
    getWhatsAppCallingConfig: getWhatsAppCallingConfig,
    enableWhatsAppCallingLegacy: enableWhatsAppCallingLegacy,
    updateWhatsAppCallingLegacy: updateWhatsAppCallingLegacy,
    disableWhatsAppCallingLegacy: disableWhatsAppCallingLegacy,
    getWhatsAppCallPermissions: getWhatsAppCallPermissions,
    initiateWhatsAppCall: initiateWhatsAppCall,
    listWhatsAppCalls: listWhatsAppCalls,
    getWhatsAppCall: getWhatsAppCall,
    getWhatsAppCallRecording: getWhatsAppCallRecording,
    getWhatsAppCallEstimate: getWhatsAppCallEstimate,
    getWhatsAppCalling: getWhatsAppCalling,
    enableWhatsAppCalling: enableWhatsAppCalling,
    updateWhatsAppCalling: updateWhatsAppCalling,
    disableWhatsAppCalling: disableWhatsAppCalling,
  };

  /**
   * calls API
   */
  calls = {
    listCalls: listCalls,
    getCall: getCall,
    getCallRecording: getCallRecording,
  };

  /**
   * voice API
   */
  voice = {
    createVoiceCall: createVoiceCall,
    listVoiceCalls: listVoiceCalls,
    getVoiceCall: getVoiceCall,
    endVoiceCall: endVoiceCall,
    getVoiceCallRecording: getVoiceCallRecording,
    transferVoiceCall: transferVoiceCall,
    getVoiceCallEstimate: getVoiceCallEstimate,
    createVoiceWebSession: createVoiceWebSession,
    dialVoiceWebCall: dialVoiceWebCall,
    enableVoiceOnNumber: enableVoiceOnNumber,
    disableVoiceOnNumber: disableVoiceOnNumber,
  };

  /**
   * sms API
   */
  sms = {
    sendSms: sendSms,
    lookupSmsNumber: lookupSmsNumber,
    listSmsOptOuts: listSmsOptOuts,
    startSmsRegistration: startSmsRegistration,
    listSmsRegistrations: listSmsRegistrations,
    deactivateSmsRegistration: deactivateSmsRegistration,
    getSmsRegistration: getSmsRegistration,
    verifySmsRegistrationOtp: verifySmsRegistrationOtp,
    resendSmsRegistrationOtp: resendSmsRegistrationOtp,
    appealSmsRegistration: appealSmsRegistration,
    uploadSmsOptInProofFile: uploadSmsOptInProofFile,
    uploadSmsOptInProof: uploadSmsOptInProof,
    shareSmsRegistration: shareSmsRegistration,
    enableSmsOnNumber: enableSmsOnNumber,
    disableSmsOnNumber: disableSmsOnNumber,
    reuseSmsRegistrationForNumber: reuseSmsRegistrationForNumber,
  };

  /**
   * whatsapptemplates API
   */
  whatsapptemplates = {
    getWhatsAppLibraryTemplate: getWhatsAppLibraryTemplate,
  };

  /**
   * whatsappphonenumbers API
   */
  whatsappphonenumbers = {
    getWhatsAppNumberInfo: getWhatsAppNumberInfo,
    getWhatsAppPhoneNumbers: getWhatsAppPhoneNumbers,
    purchaseWhatsAppPhoneNumber: purchaseWhatsAppPhoneNumber,
    listWhatsAppNumberCountries: listWhatsAppNumberCountries,
    searchAvailableWhatsAppNumbers: searchAvailableWhatsAppNumbers,
    checkWhatsAppNumberAvailability: checkWhatsAppNumberAvailability,
    getWhatsAppNumberKycForm: getWhatsAppNumberKycForm,
    submitWhatsAppNumberKyc: submitWhatsAppNumberKyc,
    uploadWhatsAppNumberKycDocument: uploadWhatsAppNumberKycDocument,
    validateWhatsAppNumberKycAddress: validateWhatsAppNumberKycAddress,
    createWhatsAppNumberKycLink: createWhatsAppNumberKycLink,
    getWhatsAppNumberRemediation: getWhatsAppNumberRemediation,
    remediateWhatsAppNumber: remediateWhatsAppNumber,
    getWhatsAppPhoneNumber: getWhatsAppPhoneNumber,
    releaseWhatsAppPhoneNumber: releaseWhatsAppPhoneNumber,
  };

  /**
   * phonenumbers API
   */
  phonenumbers = {
    listPhoneNumbers: listPhoneNumbers,
    getPhoneNumber: getPhoneNumber,
    releasePhoneNumber: releasePhoneNumber,
    purchasePhoneNumber: purchasePhoneNumber,
    listPhoneNumberCountries: listPhoneNumberCountries,
    searchAvailablePhoneNumbers: searchAvailablePhoneNumbers,
    checkPhoneNumberAvailability: checkPhoneNumberAvailability,
    getPhoneNumberKycForm: getPhoneNumberKycForm,
    submitPhoneNumberKyc: submitPhoneNumberKyc,
    uploadPhoneNumberKycDocument: uploadPhoneNumberKycDocument,
    validatePhoneNumberKycAddress: validatePhoneNumberKycAddress,
    createPhoneNumberKycLink: createPhoneNumberKycLink,
    createPhoneNumberPortIn: createPhoneNumberPortIn,
    listPhoneNumberPortIns: listPhoneNumberPortIns,
    checkPhoneNumberPortability: checkPhoneNumberPortability,
    uploadPhoneNumberPortInDocument: uploadPhoneNumberPortInDocument,
    cancelPhoneNumberPortIn: cancelPhoneNumberPortIn,
    reviewPhoneNumberKycPacket: reviewPhoneNumberKycPacket,
    getPhoneNumberRemediation: getPhoneNumberRemediation,
    remediatePhoneNumber: remediatePhoneNumber,
  };

  /**
   * whatsappsandbox API
   */
  whatsappsandbox = {
    listWhatsAppSandboxSessions: listWhatsAppSandboxSessions,
    createWhatsAppSandboxSession: createWhatsAppSandboxSession,
    deleteWhatsAppSandboxSession: deleteWhatsAppSandboxSession,
  };

  /**
   * whatsappflows API
   */
  whatsappflows = {
    listWhatsAppFlows: listWhatsAppFlows,
    createWhatsAppFlow: createWhatsAppFlow,
    getWhatsAppFlow: getWhatsAppFlow,
    updateWhatsAppFlow: updateWhatsAppFlow,
    deleteWhatsAppFlow: deleteWhatsAppFlow,
    getWhatsAppFlowJson: getWhatsAppFlowJson,
    uploadWhatsAppFlowJson: uploadWhatsAppFlowJson,
    getWhatsAppFlowPreview: getWhatsAppFlowPreview,
    listWhatsAppFlowVersions: listWhatsAppFlowVersions,
    publishWhatsAppFlow: publishWhatsAppFlow,
    deprecateWhatsAppFlow: deprecateWhatsAppFlow,
    sendWhatsAppFlowMessage: sendWhatsAppFlowMessage,
    listWhatsAppFlowResponses: listWhatsAppFlowResponses,
  };

  /**
   * contacts API
   */
  contacts = {
    listContacts: listContacts,
    createContact: createContact,
    getContact: getContact,
    updateContact: updateContact,
    deleteContact: deleteContact,
    getContactChannels: getContactChannels,
    bulkCreateContacts: bulkCreateContacts,
  };

  /**
   * customfields API
   */
  customfields = {
    setContactFieldValue: setContactFieldValue,
    clearContactFieldValue: clearContactFieldValue,
    listCustomFields: listCustomFields,
    createCustomField: createCustomField,
    updateCustomField: updateCustomField,
    deleteCustomField: deleteCustomField,
  };

  /**
   * broadcasts API
   */
  broadcasts = {
    listBroadcasts: listBroadcasts,
    createBroadcast: createBroadcast,
    getBroadcast: getBroadcast,
    updateBroadcast: updateBroadcast,
    deleteBroadcast: deleteBroadcast,
    sendBroadcast: sendBroadcast,
    scheduleBroadcast: scheduleBroadcast,
    cancelBroadcast: cancelBroadcast,
    listBroadcastRecipients: listBroadcastRecipients,
    addBroadcastRecipients: addBroadcastRecipients,
  };

  /**
   * workflows API
   */
  workflows = {
    listWorkflows: listWorkflows,
    createWorkflow: createWorkflow,
    getWorkflow: getWorkflow,
    updateWorkflow: updateWorkflow,
    deleteWorkflow: deleteWorkflow,
    activateWorkflow: activateWorkflow,
    pauseWorkflow: pauseWorkflow,
    listWorkflowExecutions: listWorkflowExecutions,
    triggerWorkflow: triggerWorkflow,
    listWorkflowExecutionEvents: listWorkflowExecutionEvents,
    duplicateWorkflow: duplicateWorkflow,
    listWorkflowVersions: listWorkflowVersions,
    getWorkflowVersion: getWorkflowVersion,
    restoreWorkflowVersion: restoreWorkflowVersion,
  };

  /**
   * sequences API
   */
  sequences = {
    listSequences: listSequences,
    createSequence: createSequence,
    getSequence: getSequence,
    updateSequence: updateSequence,
    deleteSequence: deleteSequence,
    activateSequence: activateSequence,
    pauseSequence: pauseSequence,
    enrollContacts: enrollContacts,
    unenrollContact: unenrollContact,
    listSequenceEnrollments: listSequenceEnrollments,
  };

  /**
   * commentautomations API
   */
  commentautomations = {
    listCommentAutomations: listCommentAutomations,
    createCommentAutomation: createCommentAutomation,
    getCommentAutomation: getCommentAutomation,
    updateCommentAutomation: updateCommentAutomation,
    deleteCommentAutomation: deleteCommentAutomation,
    listCommentAutomationLogs: listCommentAutomationLogs,
  };

  /**
   * ads API
   */
  ads = {
    listAds: listAds,
    getAd: getAd,
    updateAd: updateAd,
    deleteAd: deleteAd,
    updateAdStatus: updateAdStatus,
    getCampaignAnalytics: getCampaignAnalytics,
    getAdAnalytics: getAdAnalytics,
    getAdTrackingTags: getAdTrackingTags,
    updateAdTrackingTags: updateAdTrackingTags,
    getAdComments: getAdComments,
    listAdsBusinessCenters: listAdsBusinessCenters,
    listAdAccounts: listAdAccounts,
    updateAdAccount: updateAdAccount,
    getDsaDefaults: getDsaDefaults,
    getDsaRecommendations: getDsaRecommendations,
    boostPost: boostPost,
    createStandaloneAd: createStandaloneAd,
    listLeads: listLeads,
    listLeadForms: listLeadForms,
    createLeadForm: createLeadForm,
    getLeadForm: getLeadForm,
    archiveLeadForm: archiveLeadForm,
    listFormLeads: listFormLeads,
    createTestLead: createTestLead,
    searchAdInterests: searchAdInterests,
    searchAdTargeting: searchAdTargeting,
    estimateAdReach: estimateAdReach,
    getLinkedInBidPricing: getLinkedInBidPricing,
    getLinkedInSupplyForecast: getLinkedInSupplyForecast,
    listAdCatalogs: listAdCatalogs,
    listAdCatalogProductSets: listAdCatalogProductSets,
    getConversionsQuality: getConversionsQuality,
    sendConversions: sendConversions,
    adjustConversions: adjustConversions,
    listConversionDestinations: listConversionDestinations,
    createConversionDestination: createConversionDestination,
    getConversionDestination: getConversionDestination,
    updateConversionDestination: updateConversionDestination,
    deleteConversionDestination: deleteConversionDestination,
    listConversionAssociations: listConversionAssociations,
    addConversionAssociations: addConversionAssociations,
    removeConversionAssociations: removeConversionAssociations,
    getConversionMetrics: getConversionMetrics,
    createCtwaAd: createCtwaAd,
  };

  /**
   * adcampaigns API
   */
  adcampaigns = {
    listAdCampaigns: listAdCampaigns,
    updateAdCampaignStatus: updateAdCampaignStatus,
    updateAdCampaign: updateAdCampaign,
    deleteAdCampaign: deleteAdCampaign,
    bulkUpdateAdCampaignStatus: bulkUpdateAdCampaignStatus,
    duplicateAdCampaign: duplicateAdCampaign,
    updateAdSet: updateAdSet,
    updateAdSetStatus: updateAdSetStatus,
    getAdTree: getAdTree,
    getAdsTimeline: getAdsTimeline,
  };

  /**
   * adaudiences API
   */
  adaudiences = {
    listAdAudiences: listAdAudiences,
    createAdAudience: createAdAudience,
    getAdAudience: getAdAudience,
    updateAdAudience: updateAdAudience,
    deleteAdAudience: deleteAdAudience,
    addUsersToAdAudience: addUsersToAdAudience,
  };

  /**
   * trackingtags API
   */
  trackingtags = {
    listTrackingTags: listTrackingTags,
    createTrackingTag: createTrackingTag,
    getTrackingTag: getTrackingTag,
    updateTrackingTag: updateTrackingTag,
    listTrackingTagSharedAccounts: listTrackingTagSharedAccounts,
    addTrackingTagSharedAccount: addTrackingTagSharedAccount,
    removeTrackingTagSharedAccount: removeTrackingTagSharedAccount,
    getTrackingTagStats: getTrackingTagStats,
  };

  /**
   * Create a new Zernio API client.
   *
   * @param options - Configuration options for the client
   */
  constructor(options: ClientOptions = {}) {
    // Check ZERNIO_API_KEY first, fall back to LATE_API_KEY for backwards compatibility
    const apiKey = options.apiKey ?? process.env['ZERNIO_API_KEY'] ?? process.env['LATE_API_KEY'];

    if (!apiKey) {
      throw new ZernioApiError(
        "The ZERNIO_API_KEY environment variable is missing or empty; either provide it, or instantiate the Zernio client with an apiKey option, like new Zernio({ apiKey: 'sk_...' }). LATE_API_KEY is also supported for backwards compatibility.",
        401,
        'missing_api_key'
      );
    }

    this.apiKey = apiKey;
    this.baseURL = options.baseURL ?? 'https://zernio.com/api';
    this._options = options;

    // Configure the generated client. User-Agent and defaultHeaders are
    // applied at config time (not via the interceptor) because Node 20's
    // undici treats User-Agent as a forbidden header on already-constructed
    // Request objects, silently dropping `headers.set('User-Agent', …)`.
    client.setConfig({
      baseUrl: this.baseURL,
      headers: {
        'User-Agent': `zernio-node/${packageJson.version}`,
        ...(options.defaultHeaders ?? {}),
      },
    });

    // Add auth interceptor
    client.interceptors.request.use((request) => {
      request.headers.set('Authorization', `Bearer ${this.apiKey}`);
      return request;
    });

    // Add error handling interceptor
    client.interceptors.response.use(async (response) => {
      if (!response.ok) {
        let body: Record<string, unknown> | undefined;
        try {
          body = (await response.clone().json()) as Record<string, unknown>;
        } catch {
          // Ignore JSON parse errors
        }
        throw parseApiError(response, body);
      }
      return response;
    });
  }
}

/** @deprecated Use Zernio instead */
export const Late = Zernio;

// Default export for convenient usage
export default Zernio;
