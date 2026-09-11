// GENERADO desde el manifiesto de acciones de niiko — plan `9a8b80d285ff`. No editar a mano.
//
// Cada método de aquí existe porque una acción está DECLARADA como pública. Si el servidor te contesta
// `not_exposed`, es que esta copia del SDK es más nueva que el despliegue — no que te equivocaste de nombre.

/** Los tres desenlaces. Se ramifica una vez por `status` y ya sabes dónde estás. */
export type Resultado<T> =
  | { status: "done"; output: T; idempotencyKey: string }
  /** Queda esperando una firma humana y puede terminar horas después. Te avisamos por webhook. */
  | { status: "pending_approval"; proposalId: string | null; autonomy: string }
  | { status: "refused"; reason: string; detail?: Record<string, unknown> };

export class NiikoError extends Error {
  constructor(readonly status: number, readonly cuerpo: unknown) {
    super(`niiko: el servidor contestó ${status}`);
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

/** Los motivos que `miira.lead_create` declara. Uno fuera de esta lista es un fallo del servidor, no un estado. */
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

/** Los motivos que `crm.call_logged` declara. Uno fuera de esta lista es un fallo del servidor, no un estado. */
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

/** Los motivos que `crm.owner_assigned` declara. Uno fuera de esta lista es un fallo del servidor, no un estado. */
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

/** Los motivos que `crm.stage_moved` declara. Uno fuera de esta lista es un fallo del servidor, no un estado. */
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

/** Los motivos que `kiipu.invoice_proposed` declara. Uno fuera de esta lista es un fallo del servidor, no un estado. */
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

/** Los motivos que `crm.task_created` declara. Uno fuera de esta lista es un fallo del servidor, no un estado. */
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

/** Los motivos que `crm.deal_created` declara. Uno fuera de esta lista es un fallo del servidor, no un estado. */
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

/** Los motivos que `crm.note_added` declara. Uno fuera de esta lista es un fallo del servidor, no un estado. */
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

/** Los motivos que `crm.contact_added` declara. Uno fuera de esta lista es un fallo del servidor, no un estado. */
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

/** Los motivos que `miira.broadcast_quoted` declara. Uno fuera de esta lista es un fallo del servidor, no un estado. */
export type QuotedBroadcastReason = "plantilla_invalida" | "tarifas_vencidas" | "sin_permiso";

export interface SentBroadcastInput {
  quote: string;
}

export interface SentBroadcastOutput {
  queued: { clientId: string; clientName: string; mode: "free_text" | "template"; outboxId: string }[];
  costUsd: string;
}

/** Los motivos que `miira.broadcast_sent` declara. Uno fuera de esta lista es un fallo del servidor, no un estado. */
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

/** Los motivos que `kiipu.draft_voided` declara. Uno fuera de esta lista es un fallo del servidor, no un estado. */
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

/** Los motivos que `kiipu.payment_reported` declara. Uno fuera de esta lista es un fallo del servidor, no un estado. */
export type ReportedPaymentReason = "cliente_no_encontrado" | "cliente_ambiguo" | "demasiados_clientes" | "sin_factura_abierta" | "varias_facturas" | "factura_no_encontrada" | "sin_permiso";

export interface NiikoOpciones {
  /** La clave del workspace. Se ve UNA vez, al crearla en Ajustes. */
  apiKey: string;
  baseUrl?: string;
  fetch?: typeof fetch;
}

export class Niiko {
  #apiKey: string;
  #baseUrl: string;
  #fetch: typeof fetch;

  constructor(o: NiikoOpciones) {
    if (!o.apiKey) throw new Error("niiko: falta apiKey");
    this.#apiKey = o.apiKey;
    this.#baseUrl = (o.baseUrl ?? "https://niiko.org").replace(/\/+$/, "");
    this.#fetch = o.fetch ?? fetch;
  }

  async #ejercer<T>(accion: string, cuerpo: unknown, idempotencyKey?: string): Promise<Resultado<T>> {
    const r = await this.#fetch(`${this.#baseUrl}/api/v1/actions/${accion}`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${this.#apiKey}`,
        "content-type": "application/json",
        // Mándala SIEMPRE que puedas: un reintento por timeout con la misma clave no vuelve a ejecutar.
        ...(idempotencyKey ? { "idempotency-key": idempotencyKey } : {}),
      },
      body: JSON.stringify(cuerpo),
    });

    const json = await r.json().catch(() => null);
    // Una negativa NO es una excepción: es un estado del producto, y quien llama tiene que poder ramificar
    // sobre ella. Lo que sí revienta es lo que no se puede leer — ahí no hay decisión que tomar.
    if (json && typeof json === "object" && "status" in json) return json as Resultado<T>;
    throw new NiikoError(r.status, json);
  }

  /**
   * Crea un lead nuevo en el CRM del workspace a partir de sus datos de contacto. Si ya existe uno que encaja, no lo duplica: contesta `ambiguous` con los candidatos.
   *
   * `miira.lead_create` v1 — alcance `miira.lead_create@1`.
   *
   * Necesita **dos** permisos: una clave con ese alcance, y que el workspace haya encendido la acción.
   */
  async createLead(input: CreateLeadInput, idempotencyKey?: string): Promise<Resultado<CreateLeadOutput>> {
    return this.#ejercer<CreateLeadOutput>("miira.lead_create", input, idempotencyKey);
  }

  /**
   * Anota en la ficha de un cliente, dicho por su nombre, lo que se habló en una llamada; opcionalmente deja creado el seguimiento con su fecha. No lee nada ni llama a nadie.
   *
   * `crm.call_logged` v1 — alcance `crm.call_logged@1`.
   *
   * Necesita **dos** permisos: una clave con ese alcance, y que el workspace haya encendido la acción.
   */
  async loggedCall(input: LoggedCallInput, idempotencyKey?: string): Promise<Resultado<LoggedCallOutput>> {
    return this.#ejercer<LoggedCallOutput>("crm.call_logged", input, idempotencyKey);
  }

  /**
   * Cambia de quién es un cliente, diciendo el nombre del cliente y el nombre (o correo) del miembro del equipo. Si alguno de los dos es ambiguo, se niega con la lista.
   *
   * `crm.owner_assigned` v1 — alcance `crm.owner_assigned@1`.
   *
   * Necesita **dos** permisos: una clave con ese alcance, y que el workspace haya encendido la acción.
   */
  async assignedOwner(input: AssignedOwnerInput, idempotencyKey?: string): Promise<Resultado<AssignedOwnerOutput>> {
    return this.#ejercer<AssignedOwnerOutput>("crm.owner_assigned", input, idempotencyKey);
  }

  /**
   * Mueve el negocio abierto de un cliente a otra etapa del pipeline, diciendo el nombre del cliente y el de la etapa. No crea negocios: sin uno abierto se niega, y con varios se niega con la lista.
   *
   * `crm.stage_moved` v1 — alcance `crm.stage_moved@1`.
   *
   * Necesita **dos** permisos: una clave con ese alcance, y que el workspace haya encendido la acción.
   */
  async movedStage(input: MovedStageInput, idempotencyKey?: string): Promise<Resultado<MovedStageOutput>> {
    return this.#ejercer<MovedStageOutput>("crm.stage_moved", input, idempotencyKey);
  }

  /**
   * Deja preparada una factura como BORRADOR para un cliente dicho por su nombre, con sus líneas e impuestos. NO la emite, NO la numera y NO cuenta como deuda: una persona la revisa y la emite en Kiipu. No crea el cliente si no existe.
   *
   * `kiipu.invoice_proposed` v1 — alcance `kiipu.invoice_proposed@1`.
   *
   * Necesita **dos** permisos: una clave con ese alcance, y que el workspace haya encendido la acción.
   */
  async proposedInvoice(input: ProposedInvoiceInput, idempotencyKey?: string): Promise<Resultado<ProposedInvoiceOutput>> {
    return this.#ejercer<ProposedInvoiceOutput>("kiipu.invoice_proposed", input, idempotencyKey);
  }

  /**
   * Crea un recordatorio (tarea con fecha y hora) sobre un cliente dicho por su nombre. No anota una llamada: para eso está crm.call_logged. No crea el cliente si no existe.
   *
   * `crm.task_created` v1 — alcance `crm.task_created@1`.
   *
   * Necesita **dos** permisos: una clave con ese alcance, y que el workspace haya encendido la acción.
   */
  async createdTask(input: CreatedTaskInput, idempotencyKey?: string): Promise<Resultado<CreatedTaskOutput>> {
    return this.#ejercer<CreatedTaskOutput>("crm.task_created", input, idempotencyKey);
  }

  /**
   * Abre un negocio nuevo en el pipeline para un cliente dicho por su nombre, con título, valor opcional en USD, etapa opcional (por nombre; sin ella, la primera) y responsable opcional. No comprueba si ya tiene otros abiertos: devuelve cuántos quedan para que se vea un duplicado. No lo gana ni lo pierde: eso es crm.stage_moved.
   *
   * `crm.deal_created` v1 — alcance `crm.deal_created@1`.
   *
   * Necesita **dos** permisos: una clave con ese alcance, y que el workspace haya encendido la acción.
   */
  async createdDeal(input: CreatedDealInput, idempotencyKey?: string): Promise<Resultado<CreatedDealOutput>> {
    return this.#ejercer<CreatedDealOutput>("crm.deal_created", input, idempotencyKey);
  }

  /**
   * Guarda una nota en la ficha de un cliente dicho por su nombre: algo que hay que saber la próxima vez, sin llamada ni fecha. Para una llamada está crm.call_logged; para un recordatorio con fecha, crm.task_created.
   *
   * `crm.note_added` v1 — alcance `crm.note_added@1`.
   *
   * Necesita **dos** permisos: una clave con ese alcance, y que el workspace haya encendido la acción.
   */
  async addedNote(input: AddedNoteInput, idempotencyKey?: string): Promise<Resultado<AddedNoteOutput>> {
    return this.#ejercer<AddedNoteOutput>("crm.note_added", input, idempotencyKey);
  }

  /**
   * Añade una persona (nombre, y opcionalmente correo, teléfono y cargo) a la ficha de un cliente dicho por su nombre. No la hace contacto principal ni crea el cliente. Si ya había alguien con ese correo o teléfono, lo dice en la respuesta pero no lo impide.
   *
   * `crm.contact_added` v1 — alcance `crm.contact_added@1`.
   *
   * Necesita **dos** permisos: una clave con ese alcance, y que el workspace haya encendido la acción.
   */
  async addedContact(input: AddedContactInput, idempotencyKey?: string): Promise<Resultado<AddedContactOutput>> {
    return this.#ejercer<AddedContactOutput>("crm.contact_added", input, idempotencyKey);
  }

  /**
   * Presupuesta mandar el MISMO mensaje de WhatsApp a varios clientes dichos por su nombre (hasta 50). NO envía nada: dice, por cliente, si le llega el texto tal cual (ventana de 24 h abierta, gratis), si hace falta una plantilla aprobada y cuánto cuesta, o por qué no se le puede escribir. Devuelve un presupuesto firmado que vale 15 minutos; para enviar, llama a miira.broadcast_sent con él. Enséñale el presupuesto a la persona antes.
   *
   * `miira.broadcast_quoted` v1 — alcance `miira.broadcast_quoted@1`.
   *
   * Necesita **dos** permisos: una clave con ese alcance, y que el workspace haya encendido la acción.
   */
  async quotedBroadcast(input: QuotedBroadcastInput, idempotencyKey?: string): Promise<Resultado<QuotedBroadcastOutput>> {
    return this.#ejercer<QuotedBroadcastOutput>("miira.broadcast_quoted", input, idempotencyKey);
  }

  /**
   * Envía la difusión de WhatsApp presupuestada por miira.broadcast_quoted, exactamente a quienes y como dijo el presupuesto. Si algo cambió (ventana, consentimiento, tarifa) se niega con el presupuesto nuevo para confirmarlo otra vez. Cuesta dinero cuando hay plantillas: no lo llames sin que la persona haya visto el coste.
   *
   * `miira.broadcast_sent` v1 — alcance `miira.broadcast_sent@1`.
   *
   * Necesita **dos** permisos: una clave con ese alcance, y que el workspace haya encendido la acción.
   */
  async sentBroadcast(input: SentBroadcastInput, idempotencyKey?: string): Promise<Resultado<SentBroadcastOutput>> {
    return this.#ejercer<SentBroadcastOutput>("miira.broadcast_sent", input, idempotencyKey);
  }

  /**
   * Anula un BORRADOR de factura (uno creado con kiipu.invoice_proposed y todavía no emitido), por su id o por el nombre del cliente si es su único borrador. No anula facturas emitidas: eso es de una persona en Kiipu.
   *
   * `kiipu.draft_voided` v1 — alcance `kiipu.draft_voided@1`.
   *
   * Necesita **dos** permisos: una clave con ese alcance, y que el workspace haya encendido la acción.
   */
  async voidedDraft(input: VoidedDraftInput, idempotencyKey?: string): Promise<Resultado<VoidedDraftOutput>> {
    return this.#ejercer<VoidedDraftOutput>("kiipu.draft_voided", input, idempotencyKey);
  }

  /**
   * Deja en la cola de aprobación de Kiipu el aviso de que un cliente (por su nombre) pagó cierto monto de una factura abierta. NO aplica el pago ni toca saldos: una persona lo revisa contra el banco y lo aplica. Si el cliente tiene varias facturas abiertas hay que decir el número.
   *
   * `kiipu.payment_reported` v1 — alcance `kiipu.payment_reported@1`.
   *
   * Necesita **dos** permisos: una clave con ese alcance, y que el workspace haya encendido la acción.
   */
  async reportedPayment(input: ReportedPaymentInput, idempotencyKey?: string): Promise<Resultado<ReportedPaymentOutput>> {
    return this.#ejercer<ReportedPaymentOutput>("kiipu.payment_reported", input, idempotencyKey);
  }
}
