@import <Foundation/Foundation.j>
@import <AppKit/AppKit.j>
@import <Chino/KCStyledView.j>

@implementation KCSlotView : KCStyledView
{
    CPView itemView;
    id delegate @accessors;
}

- (id)init
{
    self = [self initWithFrame:CGRectMake(0, 0, 48, 48)];
    if (self)
    {
        [self hideAcceptDropStyle];
        [self setStyleRounded];
        [self setStyleInset];

        [self registerForDraggedTypes:["InventoryDragType"]];

        itemView = nil;
    }
    return self;
}

- (void)mouseDragged:(CPEvent)anEvent
{
    if (itemView == nil)
    {
        return;
    }
    
    [[CPPasteboard pasteboardWithName:CPDragPboard]declareTypes:["InventoryDragType"] owner:self];

    var data = [CPKeyedArchiver archivedDataWithRootObject: itemView];
    var newView = [CPKeyedUnarchiver unarchiveObjectWithData: data];

    // This creates a new view to be dragged instead of grabbing the old view
    // this gives the visual feedback to the user that shows that the old view
    // will stay there if its an infinite source
    if (![delegate respondsToSelector:@selector(isInfiniteSource:)] ||
        ![delegate isInfiniteSource:itemView])
    {
        [itemView removeFromSuperview];
    }

    // there's also a dragImage:... method. See the CPView documentation for details.
    [self dragView:newView
        at:CGPointMake(0, 0)
        offset:CGSizeMakeZero()
        event:anEvent
        pasteboard:nil
        source:self
        slideBack:YES];

}

- (void)pasteboard:(CPPasteboard)aPasteboard provideDataForType:(CPString)aType
{
    CPLog.trace("pasteboard", self);
    if (aType == "InventoryDragType")
    {
        var myData = [CPKeyedArchiver archivedDataWithRootObject: itemView];
        [aPasteboard setData:myData forType:aType];
    }

    // this is to avoid leaving an invisible draggable thing after a
    // drag drop ends on the same square
    if (![delegate respondsToSelector:@selector(isInfiniteSource:)] ||
        ![delegate isInfiniteSource:itemView])
    {
        [self unsetItemView];
    }
}

- (BOOL)performDragOperation:(CPDraggingInfo)aSender
{
    // called on destination
    CPLog.trace("performDragOperation", self);

    var data = [[aSender draggingPasteboard] dataForType:"InventoryDragType"];
    var view = [CPKeyedUnarchiver unarchiveObjectWithData: data];

    [self setItemView:view];

    if ([delegate respondsToSelector:@selector(receivedDragWithView:from:)])
    {
        [delegate receivedDragWithView:view from:self];
    }

    return YES;
}

- (BOOL)prepareForDragOperation:(id)sender
{
    // called on destination
    CPLog.trace("prepareForDragOperation", self, sender);

    return YES;
}

- (void)concludeDragOperation:(id)sender
{
    // called on destination
    CPLog.trace("concludeDragOperation", self);
}

- (CPDragOperation)draggingEntered:(CPDraggingInfo)aSender
{
    return [self draggingUpdated:aSender];
}

- (CPDragOperation)draggingUpdated:(CPDraggingInfo)aSender
{
    // when slot is already occupied
    if (itemView)
    {
        var canDrop = false;

        if ([delegate respondsToSelector:@selector(mergeItem:withItem:)] &&
            [delegate respondsToSelector:@selector(canMergeItem:withItem:)]
        )
        {
            var data = [[aSender draggingPasteboard] dataForType:"InventoryDragType"];
            var view = [CPKeyedUnarchiver unarchiveObjectWithData: data];
            canDrop = [delegate canMergeItem:itemView withItem:view];
        }

        if (!canDrop)
        {
            CPLog.trace("do not drop")
            [self hideAcceptDropStyle];
            return CPDragOperationNone;
        }
    }

    CPLog.trace("do drop")
    [self showAcceptDropStyle];
    return CPDragOperationCopy;
}

- (void)draggingExited:(CPDraggingInfo)aSender
{
    [self hideAcceptDropStyle];
}

- (void)draggedView:(CPView)aView endedAt:(CGPoint)aLocation operation:(CPDragOperation)anOperation
{
    // called on source
    CPLog.trace("draggedView", self, anOperation)

    if (anOperation == CPDragOperationNone)
    {
        [self setItemView:itemView];
        [self hideAcceptDropStyle];
        if ([delegate respondsToSelector:@selector(dragJumpedBack:)])
        {
            [delegate dragJumpedBack:self];
        }
    }
}

- (void)showAcceptDropStyle
{
    [self setBackgroundColor:[CPColor greenColor]];
}

- (void)hideAcceptDropStyle
{
    [self setBackgroundColor:[CPColor darkGrayColor]];
}



- (void)setItemView:(CPView)aView
{
    if (itemView)
    {
        [self unsetItemView];
    }
    itemView = aView;
    [itemView setFrameOrigin:CGPointMake(0, 0)];
    [self addSubview:itemView];
}

- (void)unsetItemView
{
    [itemView removeFromSuperview];
    itemView = nil;
}

- (CPView)itemView
{
    return itemView;
}

@end
