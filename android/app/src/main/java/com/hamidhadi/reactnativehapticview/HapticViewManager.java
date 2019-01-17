package com.hamidhadi.reactnativehapticview;

import android.view.HapticFeedbackConstants;

import com.facebook.infer.annotation.Assertions;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.views.view.ReactViewGroup;

import java.util.Map;

import javax.annotation.Nullable;

public class HapticViewManager extends ViewGroupManager<ReactViewGroup> {
    public static final String REACT_CLASS = "HapticView";
    public static final int COMMAND_PERFORM_HAPTIC = 1;

    private ReactViewGroup v;

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    public ReactViewGroup createViewInstance(ThemedReactContext reactContext) {
        v = new ReactViewGroup(reactContext);
        return v;
    }

    @Nullable
    @Override
    public Map<String, Integer> getCommandsMap() {
        return MapBuilder.of(
                "performHaptic", COMMAND_PERFORM_HAPTIC
        );
    }

    @Override
    public void receiveCommand(ReactViewGroup root, int commandId, @Nullable ReadableArray args) {
        Assertions.assertNotNull(root);
        Assertions.assertNotNull(args);

        switch(commandId) {
            case COMMAND_PERFORM_HAPTIC:
                String feedbackConstantFromArgs = args.getString(0);

                try {
                    int feedbackConstantFromArgsValue = HapticFeedbackConstants.class.getField(feedbackConstantFromArgs).getInt(null);
                    root.performHapticFeedback(feedbackConstantFromArgsValue);
                } catch (NoSuchFieldException e) {
                    e.printStackTrace();
                } catch (IllegalAccessException e) {
                    e.printStackTrace();
                }
                return;
            default:
                throw new IllegalArgumentException(String.format(
                        "Unsupported command %d received by %s.",
                        commandId,
                        getClass().getSimpleName()
                ));
        }
    }
}
