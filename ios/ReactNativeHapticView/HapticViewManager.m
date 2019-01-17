//
//  ReactNativeHapticView.m
//  ReactNativeHapticView
//
//  Created by Hamid Hadi on 10/26/1397 AP.
//  Copyright © 1397 AP Hamid Hadi. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTViewManager.h>
#import <React/RCTBridge.h>
#import <React/RCTUIManager.h>

@interface HapticViewManager : RCTViewManager
@property (nonatomic) NS_ENUM(NSInteger, hapticFeedbackConstants);
@end

@implementation HapticViewManager

RCT_EXPORT_MODULE()

- (UIView *)view
{
    return [[UIView alloc] init];
}

RCT_EXPORT_METHOD(performHaptic:(nonnull NSNumber *)reactTag
                  params:(NSInteger *)params)
{
    
    // ** If accessing to the view is needed we can use this **
    // UIView *view = [self.bridge.uiManager viewForReactTag:reactTag];
    
    int feedbackType = (int) params;
    
    if (feedbackType == 0) {
        UISelectionFeedbackGenerator *feedbackGenerator = [[UISelectionFeedbackGenerator alloc] init];
        [feedbackGenerator prepare];
        
        [feedbackGenerator selectionChanged];
        [feedbackGenerator prepare];
    } else if (feedbackType > 0 & feedbackType < 4) {
        UINotificationFeedbackGenerator *feedbackGenerator = [[UINotificationFeedbackGenerator alloc] init];
        
        UINotificationFeedbackType feedbackNotificationType[3] = {UINotificationFeedbackTypeSuccess, UINotificationFeedbackTypeWarning, UINotificationFeedbackTypeError};
        
        [feedbackGenerator prepare];
        [feedbackGenerator notificationOccurred:(feedbackNotificationType[feedbackType])];
        [feedbackGenerator prepare];
    } else if (feedbackType == 4) {
        UIImpactFeedbackGenerator *feedbackGenerator = [[UIImpactFeedbackGenerator alloc] init];
        [feedbackGenerator prepare];
        
        [feedbackGenerator impactOccurred];
        [feedbackGenerator prepare];
    }
}

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}

@end

