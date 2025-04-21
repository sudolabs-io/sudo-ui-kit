import { TreeItem } from 'context/DNDTreeContext'
import { Button } from '../button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../dialog'

interface DNDDeleteItemDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: () => void
  itemToDelete: TreeItem
}

export const DNDDeleteItemDialog = ({
  isOpen,
  onClose,
  onSubmit,
  itemToDelete,
}: DNDDeleteItemDialogProps) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Delete item</DialogTitle>
      </DialogHeader>
      <div className="mt-4">
        <p>
          Do you really want to delete item <span className="font-medium">{itemToDelete.name}</span>
          ?
        </p>
      </div>
      <DialogFooter className="mt-4">
        <Button onClick={onClose} variant="secondary">
          Cancel
        </Button>
        <Button
          onClick={onSubmit}
          className="bg-destructive text-destructive-foreground hover:bg-destructive"
        >
          Delete
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
)
