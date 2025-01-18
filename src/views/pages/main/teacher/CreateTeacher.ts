import { TeacherController } from "~/controllers";
import { Teacher } from "~/models/dto";
import { CreateElement, PageLayout, Button, Form, Input, InputLabel, InputPhoto, TextArea } from "~/views/components";

class CreateTeacher extends PageLayout<TeacherController> {
    formContainer: Form;
    addFormInputs!: HTMLDivElement;
    firstNameInput!: Input;
    lastNameInput!: Input;
    email!: Input;
    phone!: Input;
    dateInput!: Input;
    placeInput!: Input;
    addressInput!: TextArea;
    photoInput!: InputPhoto;
    imageSelect: File | undefined;
    universityInput!: Input;
    degreeInput!: Input;
    startDateInput!: Input;
    endDateInput!: Input;
    submit!: Button;
    saveAsDraft!: Button;
    cityInput!: Input;
    teacher!: Teacher;
    id: string | undefined;
    update!: Button;

    constructor(id?: string) {
        super("create-teacher_container", new TeacherController());
        this.id = id;
        this.container.setAttribute("name", "Add New Teacher");
        this.formContainer = new Form("add_teacher-form-container  d-flex flex-col items-start flex-1 gap-8");
        this.formContainer.onSubmit(() => {
            this.handleSubmitForm();
        });

        this.initData();
    }

    async initData(): Promise<void> {
        if(this.id) {
            this.teacher = await this.controller?.getTeacher(this.id);
        }
        
        super.initData();
        this.controller?.fetchData(this.initContent.bind(this));
    }

    protected initContent(): void {
        /**
         * add new teacher
         * @form Personal details: 2 columns
         * column_1: 4 rows
         * row_1: firstName + lastName
         * row_2: email + phone
         * row_3: address + image
         * row_4: dob + pob
         * @form Education:
         * column_1: 2 rows
         * row_1: university + degree
         * row_2: start & end date + city
         */
        /**
         * form personal details
         * title: Personal Details
         */
        const titlePersonalDetails = CreateElement("div", "add_title");
        titlePersonalDetails.innerHTML = "<h3>Teacher Details</h3>";

        /**
         * col_1
         * row_1 firsName + lastName
         * item_1 firstName
         */
        const labelFirstName = new InputLabel("First Name *", "add_label");
        this.firstNameInput = new Input(
            {
                placeholder: "First Name",
                value: `${this.teacher ? this.teacher.firstName : ""}`,
                required: true,
            },
            "add_input",
        );
        const addInputItem1 = CreateElement("div", "add_form-input-item", [
            labelFirstName.render(),
            this.firstNameInput.render(),
        ]);
        /**
         * item_3
         */
        const labelLastName = new InputLabel("Last Name *", "add_label");
        this.lastNameInput = new Input(
            {
                placeholder: "Last Name",
                value: `${this.teacher ? this.teacher.lastName : ""}`,
                required: true,
            },
            "add_input",
        );
        const addInputItem2 = CreateElement("div", "add_form-input-item", [
            labelLastName.render(),
            this.lastNameInput.render(),
        ]);
        const addFormInputRow1 = CreateElement("div", "add_form-input-row d-flex items-start gap-5", [
            addInputItem1,
            addInputItem2,
        ]);

        /**
         * row_2 email + phone
         * item_3 email
         */
        const labelEmail = new InputLabel("Email *", "add_label");
        this.email = new Input(
            {
                placeholder: "Email",
                value: `${this.teacher ? this.teacher.email : ""}`,
                required: true,
            },
            "add_input",
        );
        const addInputItem3 = CreateElement("div", "add_form-input-item", [labelEmail.render(), this.email.render()]);
        /**
         * item_4 phone
         */
        const labelPhone = new InputLabel("Phone *", "add_label");
        this.phone = new Input(
            {
                placeholder: "Phone",
                value: `${this.teacher ? this.teacher.phone : ""}`,
                required: true,
            },
            "add_input",
        );
        const addInputItem4 = CreateElement("div", "add_form-input-item", [labelPhone.render(), this.phone.render()]);
        const addFormInputRow2 = CreateElement("div", "add_form-input-row d-flex items-start gap-5", [
            addInputItem3,
            addInputItem4,
        ]);

        /**
         * row_3 address + photo
         * item_5 address
         */
        const labelAddress = new InputLabel("Address *", "add_label");
        this.addressInput = new TextArea(
            {
                placeholder: "Address",
                value: `${this.teacher ? this.teacher.address : ""}`,
                rows: 8,
                cols: 40,
                required: true,
            },
            "add_input",
        );
        const addInputItem5 = CreateElement("div", "add_form-input-item", [
            labelAddress.render(),
            this.addressInput.render(),
        ]);
        /**
         * item_6 photo
         */
        const labelPhoto = new InputLabel("Photo *", "add_label");
        this.photoInput = new InputPhoto((file: File) => this.handleSelectImage(file));
        const addInputItem6 = CreateElement("div", "add_form-input-item", [
            labelPhoto.render(),
            this.photoInput.render(),
        ]);
        const addFormInputRow3 = CreateElement("div", "add_form-input-row d-flex items-start gap-5", [addInputItem5, addInputItem6]);


        /**
         * row_4 date of birth + place of birth
         * item_7 
         */
        const labelDate = new InputLabel("Date of Birth *", "add_label");
        this.dateInput = new Input(
            {
                placeholder: "24 Februari 1997",
                value: `${this.teacher ? this.teacher.dob : ""}`,
                required: true,
            },
            "add_input",
        );
        const addInputItem7 = CreateElement("div", "add_form-input-item", [labelDate.render(), this.dateInput.render()]);
        /**
         * item_8
         */
        const labelPlace = new InputLabel("Place of Birth *", "add_label");
        this.placeInput = new Input(
            {
                placeholder: "Viet Nam",
                value: `${this.teacher ? this.teacher.pob : ""}`,
                required: true,
            },
            "add_input",
        );
        const addInputItem8 = CreateElement("div", "add_form-input-item", [labelPlace.render(), this.placeInput.render()]);
        const addFormInputRow4 = CreateElement("div", "add_form-input-row d-flex items-start gap-5", [
            addInputItem7,
            addInputItem8,
        ]);

        const addFormInputCol1 = CreateElement("div", "add_form-input-col d-flex flex-col flex-1 items-start gap-4", [
            addFormInputRow1,
            addFormInputRow2,
            addFormInputRow3,
            addFormInputRow4
        ]);

        const addFormInputs1 = CreateElement("div", "add_form-inputs d-flex items-start justify-start gap-8", [
            addFormInputCol1,
        ]);

        /**
         * create form personal details
         */
        const formPersonalDetails = CreateElement("div", "add_form d-flex flex-col flex-1 items-start justify-start", [
            titlePersonalDetails,
            addFormInputs1,
        ]);

        /**
         * university detail
         * title: University 
         */
        const titleUniversity = CreateElement("div", "add_title");
        titleUniversity.innerHTML = "<h3>University</h3>";

        /**
         * col_1
         * row_1 University + Degree
         * item_1 University
         */
        const labelUniversity = new InputLabel("University *", "add_label");
        this.universityInput = new Input(
            {
                placeholder: "VKU",
                value: `${this.teacher ? this.teacher.university : ""}`,
                required: true,
            },
            "add_input",
        );
        const addInputItem1University = CreateElement("div", "add_form-input-item", [
            labelUniversity.render(),
            this.universityInput.render(),
        ]);
        /**
         * item_2 Degree
         */
        const labelDegree = new InputLabel("Last Name *", "add_label");
        this.degreeInput = new Input(
            {
                placeholder: "Computer Network",
                value: `${this.teacher ? this.teacher.degree : ""}`,
                required: true,
            },
            "add_input",
        );
        const addInputItem2University = CreateElement("div", "add_form-input-item", [
            labelDegree.render(),
            this.degreeInput.render(),
        ]);
        const addFormInputRow1University = CreateElement("div", "add_form-input-row d-flex items-start gap-5", [
            addInputItem1University,
            addInputItem2University,
        ]);
        /**
         * row_2 start & end Date + City
         * item_3 start Date
         */
        const labelStartEndDate = new InputLabel("Start & End Date *", "add_label");
        this.startDateInput = new Input(
            {
                placeholder: "01 January 1999",
                value: `${this.teacher ? this.teacher.startDate : ""}`,
                required: true,
            },
            "add_input",
        );
        /**
         * item_4 end date
         */
        this.endDateInput = new Input(
            {
                placeholder: "01 January 1999",
                value: `${this.teacher ? this.teacher.endDate : ""}`,
                required: true,
            },
            "add_input",
        );
        const startEndDateRow = CreateElement("div", "add_form-input-row d-flex items-start gap-5", [
            this.startDateInput.render(),
            this.endDateInput.render(),
        ])
        const addInputItem3University = CreateElement("div", "add_form-input-item", [
            labelStartEndDate.render(),
            startEndDateRow,
        ]);
        /**
         * item_5 city
         */
        const labelCity = new InputLabel("City *", "add_label");
        this.cityInput = new Input(
            {
                placeholder: "City",
                value: `${this.teacher ? this.teacher.city : ""}`,
                required: true,
            },
            "add_input",
        );
        const addInputItem4University = CreateElement("div", "add_form-input-item", [
            labelCity.render(),
            this.cityInput.render(),
        ]);
        const addFormInputRow2Parent = CreateElement("div", "add_form-input-row d-flex items-start gap-5", [
            addInputItem3University,
            addInputItem4University,
        ]);
        
        

        const addFormInputCol1University = CreateElement(
            "div",
            "add_form-input-col d-flex flex-col flex-1 items-start gap-4",
            [addFormInputRow1University, addFormInputRow2Parent],
        );

        const addFormInputs2 = CreateElement("div", "add_form-inputs d-flex items-start justify-start gap-8", [
            addFormInputCol1University,
        ]);

        /**
         * create form parent details
         */
        const formUniversity = CreateElement("div", "add_form d-flex flex-col flex-1 items-start justify-start", [
            titleUniversity,
            addFormInputs2,
        ]);

        // actions
        // Save as Draft
        this.saveAsDraft = new Button(
            "Save as Draft",
            null,
            null,
            "outlined",
            "sm",
            "add_submit save-as-draft",
            "disabled",
            () => {},
        );

        const actions = CreateElement("div", "add_form-actions d-flex items-center justify-end gap-4", [
            this.saveAsDraft.render(),
        ]);

        if(this.id) {
            // modify 
            this.update = new Button("Update", null, null, "filled", "sm", "add_submit update", "active", () => {});
            actions.appendChild(this.update.render());
        } else {
            // Submit
            this.submit = new Button("Submit", null, null, "filled", "sm", "add_submit", "active", () => {});
            actions.appendChild(this.submit.render());
        }

        this.formContainer.form.append(formPersonalDetails, formUniversity, actions);

        this.container.appendChild(this.formContainer.form);
    }

    handleSubmitForm() {
        // data 
        const teacher: Teacher = {
            avatar: this.imageSelect || undefined,
            firstName: this.firstNameInput.render().value,
            lastName: this.lastNameInput.render().value,
            email: this.email.render().value,
            phone: parseInt(this.phone.render().value),
            address: this.addressInput.render().value,
            dob: new Date(this.dateInput.render().value),
            pob: this.placeInput.render().value,
            university: this.universityInput.render().value,
            degree: this.degreeInput.render().value,
            startDate: new Date(this.dateInput.render().value),
            endDate: new Date(this.endDateInput.render().value),
            city: this.cityInput.render().value,
        };
        
        if(this.id) {
            // update
            this.controller?.handleModifyTeacher(this.id, teacher);
        } else {
            // create
            this.controller?.handleCreateTeacher(teacher);
        }
    }

    handleSelectImage(file: File) {
        if (file) {
            this.imageSelect = file;
        }
    }

    render() {
        return this.container;
    }
}

export default CreateTeacher;