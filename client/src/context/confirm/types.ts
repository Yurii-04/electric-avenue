export interface IConfirmationDialogContext {
  openDialog: ({ sendConfirm, message, title }: OpenDialogProps) => void
  needConfirmation: boolean
  setNeedConfirmation: (value: boolean) => void
}

export type OpenDialogProps = {
  sendConfirm: (value: boolean) => void
  message: string
  title: string
  confirmButton?: string
  cancelButton?: string
}