// GENERATED from the niiko action manifest — plan `6c3240a7b22d`. Do not edit by hand.
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
export type CreateLeadReason = "honeypot" | "invalid_email" | "disposable_email" | "invalid_identity";

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
}

export interface QuotedBroadcastOutput {
  rows: { client: string; clientId: string | null; clientName: string | null; outcome: "free_text" | "template" | "needs_template" | "no_phone" | "suppressed" | "consent_revoked" | "no_marketing_consent" | "quiet_hours" | "not_found" | "ambiguous" | "too_many"; costUsd: string | null; candidates: string[] }[];
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

export interface NiikoOptions {
  /** The workspace API key. Shown ONCE, when created in Settings. */
  apiKey: string;
  baseUrl?: string;
  fetch?: typeof fetch;
}

export class Niiko {
  #apiKey: string;
  #baseUrl: string;
  #fetch: typeof fetch;

  constructor(o: NiikoOptions) {
    if (!o.apiKey) throw new Error("niiko: apiKey is required");
    this.#apiKey = o.apiKey;
    this.#baseUrl = (o.baseUrl ?? "https://niiko.org").replace(/\/+$/, "");
    this.#fetch = o.fetch ?? fetch;
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
   * Quotes sending the SAME WhatsApp message to several clients named by name (up to 50). Sends NOTHING: per client, it says whether the text goes as-is (24-hour window open, free), whether an approved template is needed and what it costs, or why that client cannot be messaged. Returns a signed quote valid for 15 minutes; to send, call miira.broadcast_sent with it. Show the quote to the person first.
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
}
