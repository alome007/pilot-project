export interface EmailAttachment {
    content: string;
    filename: string;
    type: string;
    disposition: string;
    content_id: string;
}

export interface EmailMessage {
    to: Array<{ name: string; email: string }>;
    from: string;
    subject: string;
    text: string;
    html: string;
    attachments?: EmailAttachment[];
}

export interface ParsedEmailValue {
    address: string;
}