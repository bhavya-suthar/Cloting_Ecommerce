import React from 'react'
import { Card, CardContent } from '../ui/card'
import { Label } from '../ui/label'

const AddressCard = ({addressInfo}) => {
  return (
    <Card>
        <CardContent clasname="grid gap-4">
            <Label>{addressInfo?.address}</Label>
        </CardContent>
    </Card>
  )
}

export default AddressCard