export class Tooltip {
  public text: string;
  public plain: string;
  public html: string;

  constructor(text?: string, plain?: string, html?: string);

  public static fromHtmlString(string): Tooltip;
}
