import React, { HTMLAttributes, ReactChild, FC } from 'react'

export interface IThingProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactChild
}

export const Thing: FC<IThingProps> = ({ children }: IThingProps) => {
  return <div>{children}</div>
}
