@import <Foundation/Foundation.j>
@import <AppKit/AppKit.j>

@implementation KCStyledView : CPView

- (void)setStyleInset
{
    _DOMElement.style.boxShadow = "inset 2px 2px 2px rgba(0, 0, 0, 0.4), inset -2px -2px 2px rgba(255, 255, 255, 0.4)";
}

- (void)setStyleEmbossed
{
    _DOMElement.style.boxShadow = "inset 2px 2px 2px rgba(255, 255, 255, 0.4), inset -2px -2px 2px rgba(0, 0, 0, 0.4)";
}

- (void)setStyleRounded
{
    _DOMElement.style.borderRadius = "6px";
}

@end
