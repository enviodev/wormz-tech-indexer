/*
 *Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features*
 */
import {
    WormzContract_Approval_loader,
    WormzContract_Approval_handler,
    WormzContract_ApprovalForAll_loader,
    WormzContract_ApprovalForAll_handler,
    WormzContract_ERC20Transfer_loader,
    WormzContract_ERC20Transfer_handler,
    WormzContract_ERC721Approval_loader,
    WormzContract_ERC721Approval_handler,
    WormzContract_OwnershipTransferred_loader,
    WormzContract_OwnershipTransferred_handler,
    WormzContract_Transfer_loader,
    WormzContract_Transfer_handler,
} from "../generated/src/Handlers.gen";

import {
    Wormz_ApprovalEntity,
    Wormz_ApprovalForAllEntity,
    Wormz_ERC20TransferEntity,
    Wormz_ERC721ApprovalEntity,
    Wormz_OwnershipTransferredEntity,
    Wormz_TransferEntity,
EventsSummaryEntity
} from "../generated/src/Types.gen";

export const GLOBAL_EVENTS_SUMMARY_KEY = "GlobalEventsSummary";

const INITIAL_EVENTS_SUMMARY: EventsSummaryEntity = {
  id: GLOBAL_EVENTS_SUMMARY_KEY,
    wormz_ApprovalCount: BigInt(0),
    wormz_ApprovalForAllCount: BigInt(0),
    wormz_ERC20TransferCount: BigInt(0),
    wormz_ERC721ApprovalCount: BigInt(0),
    wormz_OwnershipTransferredCount: BigInt(0),
    wormz_TransferCount: BigInt(0),
};

    WormzContract_Approval_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

    WormzContract_Approval_handler(({ event, context }) => {
  const summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  const currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  const nextSummaryEntity = {
    ...currentSummaryEntity,
    wormz_ApprovalCount: currentSummaryEntity.wormz_ApprovalCount + BigInt(1),
  };

  const wormz_ApprovalEntity: Wormz_ApprovalEntity = {
    id: event.transactionHash + event.logIndex.toString(),
      owner: event.params.owner      ,
      spender: event.params.spender      ,
      amount: event.params.amount      ,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.Wormz_Approval.set(wormz_ApprovalEntity);
});
    WormzContract_ApprovalForAll_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

    WormzContract_ApprovalForAll_handler(({ event, context }) => {
  const summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  const currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  const nextSummaryEntity = {
    ...currentSummaryEntity,
    wormz_ApprovalForAllCount: currentSummaryEntity.wormz_ApprovalForAllCount + BigInt(1),
  };

  const wormz_ApprovalForAllEntity: Wormz_ApprovalForAllEntity = {
    id: event.transactionHash + event.logIndex.toString(),
      owner: event.params.owner      ,
      operator: event.params.operator      ,
      approved: event.params.approved      ,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.Wormz_ApprovalForAll.set(wormz_ApprovalForAllEntity);
});
    WormzContract_ERC20Transfer_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

    WormzContract_ERC20Transfer_handler(({ event, context }) => {
  const summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  const currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  const nextSummaryEntity = {
    ...currentSummaryEntity,
    wormz_ERC20TransferCount: currentSummaryEntity.wormz_ERC20TransferCount + BigInt(1),
  };

  const wormz_ERC20TransferEntity: Wormz_ERC20TransferEntity = {
    id: event.transactionHash + event.logIndex.toString(),
      from: event.params.from      ,
      to: event.params.to      ,
      amount: event.params.amount      ,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.Wormz_ERC20Transfer.set(wormz_ERC20TransferEntity);
});
    WormzContract_ERC721Approval_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

    WormzContract_ERC721Approval_handler(({ event, context }) => {
  const summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  const currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  const nextSummaryEntity = {
    ...currentSummaryEntity,
    wormz_ERC721ApprovalCount: currentSummaryEntity.wormz_ERC721ApprovalCount + BigInt(1),
  };

  const wormz_ERC721ApprovalEntity: Wormz_ERC721ApprovalEntity = {
    id: event.transactionHash + event.logIndex.toString(),
      owner: event.params.owner      ,
      spender: event.params.spender      ,
      event_id: event.params.id      ,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.Wormz_ERC721Approval.set(wormz_ERC721ApprovalEntity);
});
    WormzContract_OwnershipTransferred_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

    WormzContract_OwnershipTransferred_handler(({ event, context }) => {
  const summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  const currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  const nextSummaryEntity = {
    ...currentSummaryEntity,
    wormz_OwnershipTransferredCount: currentSummaryEntity.wormz_OwnershipTransferredCount + BigInt(1),
  };

  const wormz_OwnershipTransferredEntity: Wormz_OwnershipTransferredEntity = {
    id: event.transactionHash + event.logIndex.toString(),
      user: event.params.user      ,
      newOwner: event.params.newOwner      ,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.Wormz_OwnershipTransferred.set(wormz_OwnershipTransferredEntity);
});
    WormzContract_Transfer_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

    WormzContract_Transfer_handler(({ event, context }) => {
  const summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  const currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  const nextSummaryEntity = {
    ...currentSummaryEntity,
    wormz_TransferCount: currentSummaryEntity.wormz_TransferCount + BigInt(1),
  };

  const wormz_TransferEntity: Wormz_TransferEntity = {
    id: event.transactionHash + event.logIndex.toString(),
      from: event.params.from      ,
      to: event.params.to      ,
      event_id: event.params.id      ,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.Wormz_Transfer.set(wormz_TransferEntity);
});
