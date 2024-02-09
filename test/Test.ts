import assert = require("assert")
import { MockDb, Wormz } from "../generated/src/TestHelpers.gen";
import {
  EventsSummaryEntity,
  Wormz_ApprovalEntity,
} from "../generated/src/Types.gen";

import { Addresses } from "../generated/src/bindings/Ethers.bs";

import { GLOBAL_EVENTS_SUMMARY_KEY } from "../src/EventHandlers";


const MOCK_EVENTS_SUMMARY_ENTITY: EventsSummaryEntity = {
  id: GLOBAL_EVENTS_SUMMARY_KEY,
  wormz_ApprovalCount: BigInt(0),
  wormz_ApprovalForAllCount: BigInt(0),
  wormz_ERC20TransferCount: BigInt(0),
  wormz_ERC721ApprovalCount: BigInt(0),
  wormz_OwnershipTransferredCount: BigInt(0),
  wormz_TransferCount: BigInt(0),
};

describe("Wormz contract Approval event tests", () => {
  // Create mock db
  const mockDbInitial = MockDb.createMockDb();

  // Add mock EventsSummaryEntity to mock db
  const mockDbFinal = mockDbInitial.entities.EventsSummary.set(
    MOCK_EVENTS_SUMMARY_ENTITY
  );

  // Creating mock Wormz contract Approval event
  const mockWormzApprovalEvent = Wormz.Approval.createMockEvent({
    owner: Addresses.defaultAddress,
    spender: Addresses.defaultAddress,
    amount: 0n,
    mockEventData: {
      chainId: 1,
      blockNumber: 0,
      blockTimestamp: 0,
      blockHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
      srcAddress: Addresses.defaultAddress,
      transactionHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
      transactionIndex: 0,
      logIndex: 0,
    },
  });

  // Processing the event
  const mockDbUpdated = Wormz.Approval.processEvent({
    event: mockWormzApprovalEvent,
    mockDb: mockDbFinal,
  });

  it("Wormz_ApprovalEntity is created correctly", () => {
    // Getting the actual entity from the mock database
    let actualWormzApprovalEntity = mockDbUpdated.entities.Wormz_Approval.get(
      mockWormzApprovalEvent.transactionHash +
        mockWormzApprovalEvent.logIndex.toString()
    );

    // Creating the expected entity
    const expectedWormzApprovalEntity: Wormz_ApprovalEntity = {
      id:
        mockWormzApprovalEvent.transactionHash +
        mockWormzApprovalEvent.logIndex.toString(),
      owner: mockWormzApprovalEvent.params.owner,
      spender: mockWormzApprovalEvent.params.spender,
      amount: mockWormzApprovalEvent.params.amount,
      eventsSummary: "GlobalEventsSummary",
    };
    // Asserting that the entity in the mock database is the same as the expected entity
    assert.deepEqual(actualWormzApprovalEntity, expectedWormzApprovalEntity, "Actual WormzApprovalEntity should be the same as the expectedWormzApprovalEntity");
  });

  it("EventsSummaryEntity is updated correctly", () => {
    // Getting the actual entity from the mock database
    let actualEventsSummaryEntity = mockDbUpdated.entities.EventsSummary.get(
      GLOBAL_EVENTS_SUMMARY_KEY
    );

    // Creating the expected entity
    const expectedEventsSummaryEntity: EventsSummaryEntity = {
      ...MOCK_EVENTS_SUMMARY_ENTITY,
      wormz_ApprovalCount: MOCK_EVENTS_SUMMARY_ENTITY.wormz_ApprovalCount + BigInt(1),
    };
    // Asserting that the entity in the mock database is the same as the expected entity
    assert.deepEqual(actualEventsSummaryEntity, expectedEventsSummaryEntity, "Actual WormzApprovalEntity should be the same as the expectedWormzApprovalEntity");
  });
});
