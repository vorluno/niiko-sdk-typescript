// GENERATED from the niiko action manifest — plan `dcf053ee9096`. Do not edit by hand.
//
// Every method here exists because an action is DECLARED public. If the server answers `not_exposed`,
// this copy of the SDK is newer than the deployment — not that you got the name wrong.

/** The three outcomes. Branch once on `status` and you know where you are. */
export type Result<T> =
  | { status: "done"; output: T; idempotencyKey: string }
  /** Waits for a human signature and may complete hours later. You get notified by webhook. */
  | { status: "pending_approval"; proposalId: string | null; autonomy: string }
  /** Not done. `reason` is a named reason and `detail.message`, when present, says what to do. */
  | { status: "refused"; reason: string; detail?: Record<string, unknown> };

export class NiikoError extends Error {
  constructor(readonly status: number, readonly body: unknown) {
    super(`niiko: the server answered ${status}`);
    this.name = "NiikoError";
  }
}

export interface CreateLeadInput {
  submissionId: string;
  source: "web_form" | "referral" | "api" | "import" | "event" | "other";
  name?: string;
  email?: string;
  phone?: string;
  fields?: Record<string, unknown>;
  consent?: { email: boolean; whatsapp: boolean; source: "api" | "web_form" | "verbal" | "llamada" | "visita" | "imported" };
}

export interface CreateLeadOutput {
  outcome: "created" | "existing" | "ambiguous" | "rejected";
  clientId: string | null;
  reason: "honeypot" | "invalid_email" | "disposable_email" | "invalid_identity" | null;
}

/** The reasons `miira.lead_create` declares. One outside this list is a server fault, not a state. */
export type CreateLeadReason = "honeypot" | "invalid_email" | "disposable_email" | "invalid_identity" | "leads_exceeded";

export interface LoggedCallInput {
  client: string;
  summary: string;
  followUp?: { what: string; dueAt: string };
}

export interface LoggedCallOutput {
  clientId: string;
  clientName: string;
  activityId: string;
  followUpId: string | null;
}

/** The reasons `crm.call_logged` declares. One outside this list is a server fault, not a state. */
export type LoggedCallReason = "cliente_no_encontrado" | "cliente_ambiguo" | "demasiados_clientes" | "sin_permiso";

export interface AssignedOwnerInput {
  client: string;
  owner: string;
}

export interface AssignedOwnerOutput {
  clientId: string;
  clientName: string;
  ownerUserId: string;
  ownerName: string;
}

/** The reasons `crm.owner_assigned` declares. One outside this list is a server fault, not a state. */
export type AssignedOwnerReason = "cliente_no_encontrado" | "cliente_ambiguo" | "demasiados_clientes" | "persona_no_encontrada" | "persona_ambigua" | "sin_permiso";

export interface MovedStageInput {
  client: string;
  stage: string;
  lostReason?: string;
}

export interface MovedStageOutput {
  dealId: string;
  clientId: string;
  clientName: string;
  stageName: string;
  won: boolean;
  firstWon: boolean;
}

/** The reasons `crm.stage_moved` declares. One outside this list is a server fault, not a state. */
export type MovedStageReason = "cliente_no_encontrado" | "cliente_ambiguo" | "demasiados_clientes" | "sin_negocio_abierto" | "varios_negocios" | "etapa_no_encontrada" | "negocio_cerrado" | "ya_en_esa_etapa" | "sin_permiso";

export interface ProposedInvoiceInput {
  client: string;
  lines: { concept: string; quantity: string; unitPriceUsd: string; tax: "exempt" | "itbms_7" | "itbms_10" | "itbms_15" }[];
  dueAt?: string;
  series?: string;
}

export interface ProposedInvoiceOutput {
  invoiceId: string;
  clientId: string;
  clientName: string;
  status: "draft";
  subtotalUsd: string;
  taxUsd: string;
  totalUsd: string;
  dueAt: string;
  series: string;
  issueAt: "/kiipu/facturas";
}

/** The reasons `kiipu.invoice_proposed` declares. One outside this list is a server fault, not a state. */
export type ProposedInvoiceReason = "cliente_no_encontrado" | "cliente_ambiguo" | "demasiados_clientes" | "sin_permiso";

export interface CreatedTaskInput {
  client: string;
  what: string;
  dueAt: string;
}

export interface CreatedTaskOutput {
  clientId: string;
  clientName: string;
  taskId: string;
  dueAt: string;
}

/** The reasons `crm.task_created` declares. One outside this list is a server fault, not a state. */
export type CreatedTaskReason = "cliente_no_encontrado" | "cliente_ambiguo" | "demasiados_clientes" | "sin_permiso";

export interface CreatedDealInput {
  client: string;
  title: string;
  valueUsd?: string;
  stage?: string;
  owner?: string;
}

export interface CreatedDealOutput {
  dealId: string;
  clientId: string;
  clientName: string;
  title: string;
  valueUsd: string | null;
  stageName: string;
  ownerName: string | null;
  openDeals: number;
}

/** The reasons `crm.deal_created` declares. One outside this list is a server fault, not a state. */
export type CreatedDealReason = "cliente_no_encontrado" | "cliente_ambiguo" | "demasiados_clientes" | "etapa_no_encontrada" | "etapa_cerrada" | "persona_no_encontrada" | "persona_ambigua" | "sin_permiso";

export interface AddedNoteInput {
  client: string;
  note: string;
}

export interface AddedNoteOutput {
  clientId: string;
  clientName: string;
  noteId: string;
}

/** The reasons `crm.note_added` declares. One outside this list is a server fault, not a state. */
export type AddedNoteReason = "cliente_no_encontrado" | "cliente_ambiguo" | "demasiados_clientes" | "sin_permiso";

export interface AddedContactInput {
  client: string;
  name: string;
  email?: string;
  phone?: string;
  role?: string;
}

export interface AddedContactOutput {
  clientId: string;
  clientName: string;
  contactId: string;
  possibleDuplicate: boolean;
}

/** The reasons `crm.contact_added` declares. One outside this list is a server fault, not a state. */
export type AddedContactReason = "cliente_no_encontrado" | "cliente_ambiguo" | "demasiados_clientes" | "sin_permiso";

export interface QuotedBroadcastInput {
  clients: string[];
  message: string;
  template?: string;
  templateValues?: string[];
  purpose?: "notice" | "promotion";
}

export interface QuotedBroadcastOutput {
  rows: { client: string; clientId: string | null; clientName: string | null; outcome: "free_text" | "template" | "needs_template" | "no_phone" | "suppressed" | "consent_revoked" | "no_marketing_consent" | "quiet_hours" | "not_found" | "ambiguous" | "too_many" | "us_moratorium"; costUsd: string | null; candidates: string[] }[];
  totals: { freeText: number; template: number; skipped: number; costUsd: string };
  quote: string | null;
  expiresAt: string | null;
}

/** The reasons `miira.broadcast_quoted` declares. One outside this list is a server fault, not a state. */
export type QuotedBroadcastReason = "plantilla_invalida" | "tarifas_vencidas" | "sin_permiso";

export interface SentBroadcastInput {
  quote: string;
}

export interface SentBroadcastOutput {
  queued: { clientId: string; clientName: string; mode: "free_text" | "template"; outboxId: string }[];
  costUsd: string;
}

/** The reasons `miira.broadcast_sent` declares. One outside this list is a server fault, not a state. */
export type SentBroadcastReason = "presupuesto_invalido" | "presupuesto_vencido" | "presupuesto_cambiado" | "plantilla_invalida" | "tarifas_vencidas" | "sin_permiso";

export interface VoidedDraftInput {
  invoiceId?: string;
  client?: string;
}

export interface VoidedDraftOutput {
  invoiceId: string;
  clientId: string;
  clientName: string;
  totalUsd: string;
  status: "void";
}

/** The reasons `kiipu.draft_voided` declares. One outside this list is a server fault, not a state. */
export type VoidedDraftReason = "cliente_no_encontrado" | "cliente_ambiguo" | "demasiados_clientes" | "borrador_no_encontrado" | "varios_borradores" | "no_es_borrador" | "sin_permiso";

export interface ReportedPaymentInput {
  client: string;
  amountUsd: string;
  invoice?: string;
}

export interface ReportedPaymentOutput {
  submissionId: string;
  clientId: string;
  clientName: string;
  invoiceId: string;
  invoiceNumber: string;
  outstandingUsd: string;
  declaredUsd: string;
  status: "received";
  reviewAt: "/kiipu/aprobaciones";
}

/** The reasons `kiipu.payment_reported` declares. One outside this list is a server fault, not a state. */
export type ReportedPaymentReason = "cliente_no_encontrado" | "cliente_ambiguo" | "demasiados_clientes" | "sin_factura_abierta" | "varias_facturas" | "factura_no_encontrada" | "sin_permiso";

/** A read has TWO outcomes: it changes nothing, so it never waits for a signature. */
export type ReadResult<T> =
  | { status: "done"; output: T }
  /** Not read. `reason` is a named reason and `detail.message`, when present, says what to do. */
  | { status: "refused"; reason: string; detail?: Record<string, unknown> };

export interface SearchClientsInput {
  search?: string;
  status?: "lead" | "qualified" | "client" | "churned" | "reactivated" | "completed";
  tag?: string;
  createdSince?: string;
}

export interface SearchClientsOutput {
  total: number;
  totalIsMinimum: boolean;
  byStatus: Record<string, unknown>;
  clients: { name: string; status: "lead" | "qualified" | "client" | "churned" | "reactivated" | "completed"; owner: string | null; createdOn: string }[];
}

/** The reasons `crm.clients_search` declares. One outside this list is a server fault, not a state. */
export type SearchClientsReason = "invalid_input" | "role_forbidden" | "grant_off" | "reads_need_a_person";

export interface GetCollectionsInput {

}

export interface GetCollectionsOutput {
  currency: string;
  outstandingTotal: string;
  openInvoices: number;
  overdueTotal: string;
  agingBuckets: { bucket: "d1_30" | "d31_60" | "d61_90" | "d90_plus"; amount: string; installments: number; clients: number }[];
  debtors: { client: string | null; overdue: string; oldestDueOn: string; daysOverdue: number; bucket: "d1_30" | "d31_60" | "d61_90" | "d90_plus"; invoices: number }[];
  upcoming: { client: string | null; invoice: string | null; dueOn: string; amount: string }[];
  incomplete: boolean;
}

/** The reasons `kiipu.collections_get` declares. One outside this list is a server fault, not a state. */
export type GetCollectionsReason = "invalid_input" | "role_forbidden" | "grant_off" | "reads_need_a_person";

export interface GetCollectedMonthInput {

}

export interface GetCollectedMonthOutput {
  currency: string;
  collectedThisMonth: string;
  periodStart: string;
  periodEnd: string;
  collectedSamePeriodLastMonth: string;
  outstandingTotal: string;
  openInvoices: number;
  incomplete: boolean;
}

/** The reasons `kiipu.collected_month_get` declares. One outside this list is a server fault, not a state. */
export type GetCollectedMonthReason = "invalid_input" | "role_forbidden" | "grant_off" | "reads_need_a_person";

export interface ListClientInvoicesInput {
  client: string;
}

export interface ListClientInvoicesOutput {
  client: string;
  owedTotal: string;
  invoices: { number: string | null; status: string; total: string; balance: string; currency: string; createdOn: string; dueOn: string | null; daysOverdue: number | null }[];
  payments: { invoice: string | null; paidOn: string; amount: string; method: string; reversed: boolean }[];
}

/** The reasons `kiipu.client_invoices_list` declares. One outside this list is a server fault, not a state. */
export type ListClientInvoicesReason = "invalid_input" | "role_forbidden" | "grant_off" | "reads_need_a_person" | "ambiguous" | "not_found";

export interface GetConversationsWaitingInput {

}

export interface GetConversationsWaitingOutput {
  handledByAPerson: number;
  waitingForReply: number;
  thresholdMinutes: number;
  waitingOverThreshold: number;
  longestWaitMinutes: number | null;
}

/** The reasons `miira.conversations_waiting_get` declares. One outside this list is a server fault, not a state. */
export type GetConversationsWaitingReason = "invalid_input" | "role_forbidden" | "grant_off" | "reads_need_a_person";

export interface GetAgendaInput {
  period?: "today" | "this_week" | "next_week" | "this_month";
}

export interface GetAgendaOutput {
  period: "today" | "this_week" | "next_week" | "this_month";
  today: string;
  periodStart: string;
  periodEnd: string;
  timeZone: string;
  appointments: number;
  byStatus: Record<string, unknown>;
  totalIsMinimum: boolean;
  first: { date: string; time: string; client: string | null; resource: string | null; status: string }[];
}

/** The reasons `ciita.agenda_get` declares. One outside this list is a server fault, not a state. */
export type GetAgendaReason = "invalid_input" | "role_forbidden" | "grant_off" | "reads_need_a_person";

export interface GetFunnelInput {

}

export interface GetFunnelOutput {
  leadsInFunnel: number;
  totalIsMinimum: boolean;
  byStage: { stage: string; qualified: boolean; leads: number }[];
  qualified: number;
  enteredThisMonth: number;
  recent: { name: string | null; stage: string | null; enteredOn: string }[];
}

/** The reasons `miira.funnel_get` declares. One outside this list is a server fault, not a state. */
export type GetFunnelReason = "invalid_input" | "role_forbidden" | "grant_off" | "reads_need_a_person";

export interface GetMonthResultInput {

}

export interface GetMonthResultOutput {
  currency: string;
  ledgerBalanced: boolean;
  month: string | null;
  noActivityThisMonth: boolean;
  thisMonth: { revenue: string; expenses: string; netIncome: string; closed: boolean; topRevenue: { account: string; amount: string }[]; topExpenses: { account: string; amount: string }[] } | null;
  previousMonth: { month: string; revenue: string; expenses: string; netIncome: string } | null;
}

/** The reasons `kiipu.month_result_get` declares. One outside this list is a server fault, not a state. */
export type GetMonthResultReason = "invalid_input" | "role_forbidden" | "grant_off" | "reads_need_a_person";

export interface GetMonthSummaryInput {

}

export interface GetMonthSummaryOutput {
  periodStart: string;
  periodEnd: string;
  newClients: { total: number; totalIsMinimum: boolean; byStatus: Record<string, unknown> } | null;
  collected: { thisMonth: string; samePeriodLastMonth: string; outstanding: string; openInvoices: number; currency: string } | null;
  proposals: { sent: number; accepted: number; acceptedUsd: string; awaitingReply: number; awaitingReplyUsd: string; totalIsMinimum: boolean } | null;
  dealsWon: { count: number; totalUsd: string } | null;
  appointments: { count: number; byStatus: Record<string, unknown>; totalIsMinimum: boolean } | null;
  monthResult: { currency: string; ledgerBalanced: boolean; month: string | null; noActivityThisMonth: boolean; thisMonth: { revenue: string; expenses: string; netIncome: string; closed: boolean; topRevenue: { account: string; amount: string }[]; topExpenses: { account: string; amount: string }[] } | null; previousMonth: { month: string; revenue: string; expenses: string; netIncome: string } | null } | null;
  unavailable: { piece: "new_clients" | "collected" | "proposals" | "deals_won" | "appointments" | "month_result"; reason: "role" | "off" }[];
}

/** The reasons `crm.month_summary_get` declares. One outside this list is a server fault, not a state. */
export type GetMonthSummaryReason = "invalid_input" | "role_forbidden" | "grant_off" | "reads_need_a_person";

export interface NiikoOptions {
  /** The workspace API key, for ACTIONS. Shown ONCE, when created in Settings. */
  apiKey?: string;
  /**
   * An OAuth access token: what READS need. A read is done on behalf of a person, with their role, so an API key
   * cannot read (it gets `reads_need_a_person`). A token also exercises the actions it was granted.
   */
  accessToken?: string;
  baseUrl?: string;
  fetch?: typeof fetch;
}

export class Niiko {
  #apiKey: string;
  #accessToken: string;
  #baseUrl: string;
  #fetch: typeof fetch;

  constructor(o: NiikoOptions) {
    if (!o.apiKey && !o.accessToken) throw new Error("niiko: apiKey or accessToken is required");
    // With only one of the two, it is used for everything: the server says which one each call needs.
    this.#apiKey = (o.apiKey ?? o.accessToken)!;
    this.#accessToken = (o.accessToken ?? o.apiKey)!;
    this.#baseUrl = (o.baseUrl ?? "https://niiko.org").replace(/\/+$/, "");
    this.#fetch = o.fetch ?? fetch;
  }

  async #read<T>(read: string, body: unknown): Promise<ReadResult<T>> {
    // No idempotency key: a read has no effect to duplicate.
    const r = await this.#fetch(`${this.#baseUrl}/api/v1/reads/${read}`, {
      method: "POST",
      headers: { authorization: `Bearer ${this.#accessToken}`, "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    const json = await r.json().catch(() => null);
    if (json && typeof json === "object" && "status" in json) return json as ReadResult<T>;
    throw new NiikoError(r.status, json);
  }

  async #exercise<T>(action: string, body: unknown, idempotencyKey?: string): Promise<Result<T>> {
    const r = await this.#fetch(`${this.#baseUrl}/api/v1/actions/${action}`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${this.#apiKey}`,
        "content-type": "application/json",
        // Send it WHENEVER you can: a timeout retry with the same key does not execute again.
        ...(idempotencyKey ? { "idempotency-key": idempotencyKey } : {}),
      },
      body: JSON.stringify(body),
    });

    const json = await r.json().catch(() => null);
    // A refusal is NOT an exception: it is a product state, and the caller must be able to branch on it.
    // What does throw is what cannot be read — there is no decision to make there.
    if (json && typeof json === "object" && "status" in json) return json as Result<T>;
    throw new NiikoError(r.status, json);
  }

  /**
   * Creates a new lead in the workspace CRM from its contact details. If a matching one already exists it is not duplicated: the reply is `ambiguous` with the candidates.
   *
   * `miira.lead_create` v1 — scope `miira.lead_create@1`.
   *
   * Needs **two** permissions: a key with that scope, and the workspace having switched the action on.
   */
  async createLead(input: CreateLeadInput, idempotencyKey?: string): Promise<Result<CreateLeadOutput>> {
    return this.#exercise<CreateLeadOutput>("miira.lead_create", input, idempotencyKey);
  }

  /**
   * Logs what was discussed in a call on a client's record, naming the client; optionally creates the follow-up with its date. Reads nothing and calls no one.
   *
   * `crm.call_logged` v1 — scope `crm.call_logged@1`.
   *
   * Needs **two** permissions: a key with that scope, and the workspace having switched the action on.
   */
  async loggedCall(input: LoggedCallInput, idempotencyKey?: string): Promise<Result<LoggedCallOutput>> {
    return this.#exercise<LoggedCallOutput>("crm.call_logged", input, idempotencyKey);
  }

  /**
   * Changes who owns a client, naming the client and the team member (by name or email). If either is ambiguous it refuses with the list.
   *
   * `crm.owner_assigned` v1 — scope `crm.owner_assigned@1`.
   *
   * Needs **two** permissions: a key with that scope, and the workspace having switched the action on.
   */
  async assignedOwner(input: AssignedOwnerInput, idempotencyKey?: string): Promise<Result<AssignedOwnerOutput>> {
    return this.#exercise<AssignedOwnerOutput>("crm.owner_assigned", input, idempotencyKey);
  }

  /**
   * Moves a client's open deal to another pipeline stage, naming the client and the stage. Creates no deals: with no open deal it refuses, and with several it refuses with the list.
   *
   * `crm.stage_moved` v1 — scope `crm.stage_moved@1`.
   *
   * Needs **two** permissions: a key with that scope, and the workspace having switched the action on.
   */
  async movedStage(input: MovedStageInput, idempotencyKey?: string): Promise<Result<MovedStageOutput>> {
    return this.#exercise<MovedStageOutput>("crm.stage_moved", input, idempotencyKey);
  }

  /**
   * Prepares an invoice as a DRAFT for a client named by name, with its lines and taxes. Does NOT issue it, does NOT number it and does NOT count as debt: a person reviews and issues it in Kiipu. Does not create the client if it does not exist.
   *
   * `kiipu.invoice_proposed` v1 — scope `kiipu.invoice_proposed@1`.
   *
   * Needs **two** permissions: a key with that scope, and the workspace having switched the action on.
   */
  async proposedInvoice(input: ProposedInvoiceInput, idempotencyKey?: string): Promise<Result<ProposedInvoiceOutput>> {
    return this.#exercise<ProposedInvoiceOutput>("kiipu.invoice_proposed", input, idempotencyKey);
  }

  /**
   * Creates a reminder (a task with date and time) on a client named by name. Does not log a call: that is crm.call_logged. Does not create the client if it does not exist.
   *
   * `crm.task_created` v1 — scope `crm.task_created@1`.
   *
   * Needs **two** permissions: a key with that scope, and the workspace having switched the action on.
   */
  async createdTask(input: CreatedTaskInput, idempotencyKey?: string): Promise<Result<CreatedTaskOutput>> {
    return this.#exercise<CreatedTaskOutput>("crm.task_created", input, idempotencyKey);
  }

  /**
   * Opens a new deal in the pipeline for a client named by name, with a title, an optional value in USD, an optional stage (by name; without it, the first one) and an optional owner. Does not check for other open deals: it returns how many remain so a duplicate is visible. Does not win or lose it: that is crm.stage_moved.
   *
   * `crm.deal_created` v1 — scope `crm.deal_created@1`.
   *
   * Needs **two** permissions: a key with that scope, and the workspace having switched the action on.
   */
  async createdDeal(input: CreatedDealInput, idempotencyKey?: string): Promise<Result<CreatedDealOutput>> {
    return this.#exercise<CreatedDealOutput>("crm.deal_created", input, idempotencyKey);
  }

  /**
   * Saves a note on a client's record, naming the client: something to know next time, with no call and no date. For a call use crm.call_logged; for a dated reminder, crm.task_created.
   *
   * `crm.note_added` v1 — scope `crm.note_added@1`.
   *
   * Needs **two** permissions: a key with that scope, and the workspace having switched the action on.
   */
  async addedNote(input: AddedNoteInput, idempotencyKey?: string): Promise<Result<AddedNoteOutput>> {
    return this.#exercise<AddedNoteOutput>("crm.note_added", input, idempotencyKey);
  }

  /**
   * Adds a person (name, and optionally email, phone and role) to a client's record, naming the client. Does not make them the primary contact and does not create the client. If someone with that email or phone already existed, the reply says so but does not block it.
   *
   * `crm.contact_added` v1 — scope `crm.contact_added@1`.
   *
   * Needs **two** permissions: a key with that scope, and the workspace having switched the action on.
   */
  async addedContact(input: AddedContactInput, idempotencyKey?: string): Promise<Result<AddedContactOutput>> {
    return this.#exercise<AddedContactOutput>("crm.contact_added", input, idempotencyKey);
  }

  /**
   * Quotes sending the SAME WhatsApp message to several clients named by name (up to 50). Sends NOTHING: per client, it says whether the text goes as-is (24-hour window open, free), whether an approved template is needed and what it costs, or why that client cannot be messaged. Returns a signed quote valid for 15 minutes; to send, call miira.broadcast_sent with it. Show the quote to the person first. Optional `purpose`: `notice` (default) is the usual notice; `promotion` NEVER sends free text, even with the window open, and requires an approved MARKETING template (otherwise plantilla_invalida): it only reaches clients with granted marketing consent (no_marketing_consent otherwise) and leaves US numbers out (us_moratorium). In a promotion `message` is never sent: what goes is the template with its `templateValues`. Use `promotion` for offers and campaigns, never for a reply or a notice.
   *
   * `miira.broadcast_quoted` v1 — scope `miira.broadcast_quoted@1`.
   *
   * Needs **two** permissions: a key with that scope, and the workspace having switched the action on.
   */
  async quotedBroadcast(input: QuotedBroadcastInput, idempotencyKey?: string): Promise<Result<QuotedBroadcastOutput>> {
    return this.#exercise<QuotedBroadcastOutput>("miira.broadcast_quoted", input, idempotencyKey);
  }

  /**
   * Sends the WhatsApp broadcast quoted by miira.broadcast_quoted, exactly to whom and how the quote said. If anything changed (window, consent, rate) it refuses with a new quote to confirm again. Costs money when templates are involved: do not call it without the person having seen the cost.
   *
   * `miira.broadcast_sent` v1 — scope `miira.broadcast_sent@1`.
   *
   * Needs **two** permissions: a key with that scope, and the workspace having switched the action on.
   */
  async sentBroadcast(input: SentBroadcastInput, idempotencyKey?: string): Promise<Result<SentBroadcastOutput>> {
    return this.#exercise<SentBroadcastOutput>("miira.broadcast_sent", input, idempotencyKey);
  }

  /**
   * Voids a DRAFT invoice (one created with kiipu.invoice_proposed and not yet issued), by its id or by the client's name when it is their only draft. Does not void issued invoices: that is for a person in Kiipu.
   *
   * `kiipu.draft_voided` v1 — scope `kiipu.draft_voided@1`.
   *
   * Needs **two** permissions: a key with that scope, and the workspace having switched the action on.
   */
  async voidedDraft(input: VoidedDraftInput, idempotencyKey?: string): Promise<Result<VoidedDraftOutput>> {
    return this.#exercise<VoidedDraftOutput>("kiipu.draft_voided", input, idempotencyKey);
  }

  /**
   * Leaves in the Kiipu approval queue the notice that a client (by name) paid a given amount of an open invoice. Does NOT apply the payment and touches no balances: a person checks it against the bank and applies it. If the client has several open invoices the number must be given.
   *
   * `kiipu.payment_reported` v1 — scope `kiipu.payment_reported@1`.
   *
   * Needs **two** permissions: a key with that scope, and the workspace having switched the action on.
   */
  async reportedPayment(input: ReportedPaymentInput, idempotencyKey?: string): Promise<Result<ReportedPaymentOutput>> {
    return this.#exercise<ReportedPaymentOutput>("kiipu.payment_reported", input, idempotencyKey);
  }

  /**
   * Counts and finds the workspace's CRM clients, optionally by part of the name, status, tag or creation date. Returns the total, the total per status and up to 15 clients with status, owner and creation day. No contact details and no notes.
   *
   * `crm.clients_search` v1 — scope `crm.clients_search@1`. Read-only.
   *
   * Needs an OAuth **accessToken** with that scope (an API key gets `reads_need_a_person`), and the workspace having
   * switched the read on. It answers with what the person behind the token can see.
   */
  async searchClients(input: SearchClientsInput = {}): Promise<ReadResult<SearchClientsOutput>> {
    return this.#read<SearchClientsOutput>("crm.clients_search", input);
  }

  /**
   * Reads what is owed: the outstanding total, what is overdue by age bucket, the 15 clients who owe the most with their overdue amount and since when, and the next installments due. Changes nothing and contacts no one.
   *
   * `kiipu.collections_get` v1 — scope `kiipu.collections_get@1`. Read-only.
   *
   * Needs an OAuth **accessToken** with that scope (an API key gets `reads_need_a_person`), and the workspace having
   * switched the read on. It answers with what the person behind the token can see.
   */
  async getCollections(input: GetCollectionsInput = {}): Promise<ReadResult<GetCollectionsOutput>> {
    return this.#read<GetCollectionsOutput>("kiipu.collections_get", input);
  }

  /**
   * Reads how much was collected this month so far (as the ledger recorded it), the same stretch of last month to compare, and what is still outstanding. Does not say who owes: that is kiipu.collections_get.
   *
   * `kiipu.collected_month_get` v1 — scope `kiipu.collected_month_get@1`. Read-only.
   *
   * Needs an OAuth **accessToken** with that scope (an API key gets `reads_need_a_person`), and the workspace having
   * switched the read on. It answers with what the person behind the token can see.
   */
  async getCollectedMonth(input: GetCollectedMonthInput = {}): Promise<ReadResult<GetCollectedMonthOutput>> {
    return this.#read<GetCollectedMonthOutput>("kiipu.collected_month_get", input);
  }

  /**
   * Lists the latest invoices and payments of ONE client named by name: number, status, total, balance, and when and how they paid. With several matches it refuses with `ambiguous` and the candidates; with none, `not_found`.
   *
   * `kiipu.client_invoices_list` v1 — scope `kiipu.client_invoices_list@1`. Read-only.
   *
   * Needs an OAuth **accessToken** with that scope (an API key gets `reads_need_a_person`), and the workspace having
   * switched the read on. It answers with what the person behind the token can see.
   */
  async listClientInvoices(input: ListClientInvoicesInput): Promise<ReadResult<ListClientInvoicesOutput>> {
    return this.#read<ListClientInvoicesOutput>("kiipu.client_invoices_list", input);
  }

  /**
   * Reads how many conversations a team member is handling, how many are waiting for a reply, how many have waited longer than the workspace threshold and the longest wait. Counts only: no names and no messages.
   *
   * `miira.conversations_waiting_get` v1 — scope `miira.conversations_waiting_get@1`. Read-only.
   *
   * Needs an OAuth **accessToken** with that scope (an API key gets `reads_need_a_person`), and the workspace having
   * switched the read on. It answers with what the person behind the token can see.
   */
  async getConversationsWaiting(input: GetConversationsWaitingInput = {}): Promise<ReadResult<GetConversationsWaitingOutput>> {
    return this.#read<GetConversationsWaitingOutput>("miira.conversations_waiting_get", input);
  }

  /**
   * Reads the appointments of today, this week, next week or this month: how many per status and the first 15 with day, time in the workspace time zone, client, resource and status. Books nothing.
   *
   * `ciita.agenda_get` v1 — scope `ciita.agenda_get@1`. Read-only.
   *
   * Needs an OAuth **accessToken** with that scope (an API key gets `reads_need_a_person`), and the workspace having
   * switched the read on. It answers with what the person behind the token can see.
   */
  async getAgenda(input: GetAgendaInput = {}): Promise<ReadResult<GetAgendaOutput>> {
    return this.#read<GetAgendaOutput>("ciita.agenda_get", input);
  }

  /**
   * Reads the Miira lead funnel by stage (the same rule as the board), how many leads are qualified, how many came in this month and the 15 most recent with their stage. Clients who already bought are in the CRM, not here.
   *
   * `miira.funnel_get` v1 — scope `miira.funnel_get@1`. Read-only.
   *
   * Needs an OAuth **accessToken** with that scope (an API key gets `reads_need_a_person`), and the workspace having
   * switched the read on. It answers with what the person behind the token can see.
   */
  async getFunnel(input: GetFunnelInput = {}): Promise<ReadResult<GetFunnelOutput>> {
    return this.#read<GetFunnelOutput>("miira.funnel_get", input);
  }

  /**
   * Reads this month's income statement from the ledger: revenue, expenses, net income, the accounts that weigh most and last month to compare. If the ledger does not balance right now it gives no figures; with no entries it says so, never zero.
   *
   * `kiipu.month_result_get` v1 — scope `kiipu.month_result_get@1`. Read-only.
   *
   * Needs an OAuth **accessToken** with that scope (an API key gets `reads_need_a_person`), and the workspace having
   * switched the read on. It answers with what the person behind the token can see.
   */
  async getMonthResult(input: GetMonthResultInput = {}): Promise<ReadResult<GetMonthResultOutput>> {
    return this.#read<GetMonthResultOutput>("kiipu.month_result_get", input);
  }

  /**
   * Reads how the month is going, piece by piece and with the same figures each read would give: new clients, collected, proposals sent and accepted, deals won, appointments and the ledger result. A piece the person's role does not see, or whose read is off, comes back in `unavailable`.
   *
   * `crm.month_summary_get` v1 — scope `crm.month_summary_get@1`. Read-only.
   *
   * Needs an OAuth **accessToken** with that scope (an API key gets `reads_need_a_person`), and the workspace having
   * switched the read on. It answers with what the person behind the token can see.
   */
  async getMonthSummary(input: GetMonthSummaryInput = {}): Promise<ReadResult<GetMonthSummaryOutput>> {
    return this.#read<GetMonthSummaryOutput>("crm.month_summary_get", input);
  }
}
