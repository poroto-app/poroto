import { ComponentMeta, ComponentStory } from "@storybook/react";
import { useEffect, useState } from "react";
import { copyObject } from "src/domain/util/object";
import { mockPlan } from "src/stories/mock/plan";
import { PlanEditorDialog } from "src/view/plan/edit/PlanEditorDialog";

export default {
    title: "plan/edit/PlanEditorDialog",
    component: PlanEditorDialog,
} as ComponentMeta<typeof PlanEditorDialog>;

const Template: ComponentStory<typeof PlanEditorDialog> = ({
    places,
    visible: visibilityOriginal,
}) => {
    const [visible, setVisible] = useState(visibilityOriginal);

    useEffect(() => {
        setVisible(visibilityOriginal);
    }, [visibilityOriginal]);

    return (
        <PlanEditorDialog
            visible={visible}
            onClosed={() => {
                console.log("close");
                setVisible(false);
            }}
            places={places}
            onSave={(places) => 0}
        />
    );
};

export const PlanEditorDialogStoryBook = Template.bind({});
PlanEditorDialogStoryBook.args = {
    places: mockPlan.places,
    visible: true,
};
