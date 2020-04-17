import React from "react";
import { fireEvent, render } from "@testing-library/react";
import BoardGameForm from "./BoardGameForm";
import { mockTranslations } from "utils/testUtils";

test("Should not be able to submit form when no text is provided", () => {
    mockTranslations();
    const onSubmit = jest.fn();
    const onCancel = jest.fn();

    const { container } = render(<BoardGameForm onSubmit={onSubmit} onCancel={onCancel} />);
    const button = container.querySelector('button[type="submit"]') as HTMLButtonElement;

    expect(button.disabled).toBeTruthy();
});

test("Should not be able to submit form when submit is disabled", () => {
    mockTranslations();
    const onSubmit = jest.fn();
    const onCancel = jest.fn();

    const { container } = render(<BoardGameForm onSubmit={onSubmit} onCancel={onCancel} />);
    const button = container.querySelector('button[type="submit"]') as HTMLButtonElement;

    fireEvent.click(button);

    expect(onSubmit).not.toBeCalled();
});

test("Should display initial value", () => {
    mockTranslations();
    const onSubmit = jest.fn();
    const onCancel = jest.fn();

    const { getByDisplayValue } = render(
        <BoardGameForm onSubmit={onSubmit} onCancel={onCancel} initialValue="Initial" />,
    );
    const initialValue = getByDisplayValue(/Initial/i);

    expect(initialValue).toBeInTheDocument();
});
