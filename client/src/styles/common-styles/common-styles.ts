export const alignItemsCenter = {
  display: 'flex',
  alignItems: 'center',
} as const;

export const borderDivider = {
  border: '1px solid',
  borderColor: 'divider',
} as const;

export const textClampStyle = {
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  wordBreak: 'break-word',
} as const;