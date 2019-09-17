import * as React from "react";
import Select from "../js/ui/components/Select";
import {shallow, mount, render, ReactWrapper, configure} from "enzyme";
import {Formik} from "formik";
import Adapter from "enzyme-adapter-react-16";

configure({adapter: new Adapter()});

describe("Check Select", () => {
    let component: ReactWrapper<null, {values: {[key: string]: string}}>;
    beforeEach(() => {
        component = mount(
            <Formik
                initialValues={{SimpleSelect: "USD"}}
                onSubmit={() => {}}
            >
                {({setFieldValue}) => (
                    <form>
                        <Select setFieldValue={setFieldValue}
                                name="SimpleSelect"
                                items={["USD", "GBP", "ASD"]}>
                            <label htmlFor="SimpleSelect">Facebook</label></Select>
                    </form>
                )}
            </Formik>
        );
    });
    it("default value ", async () => {
        expect(component.find(".icon-USD").html()).toBe('<i class="icon-USD"></i>');
        component.find("button").simulate("click");
        expect(component.find("li").length).toBe(3);
        component.find("li").at(2).simulate("click");
        expect(component.find(".icon-ASD").html()).toBe('<i class="icon-ASD"></i>');
    });

    it("Select label children text", () => {
        expect(component.find("label").text()).toBe("Facebook");
    });

    it("Select label children text2", () => {
        expect(component.find("button")).toBeTruthy();
        expect(component.state().values.SimpleSelect).toBe("USD");
        component.find("button").simulate("click");
        expect(component.find("li").length).toBe(3);
        component.find("li:last-child").simulate("click");
        expect(component.state().values.SimpleSelect).toBe("ASD");
    });
});
