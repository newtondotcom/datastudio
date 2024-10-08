const translations = {
	en: {
		submit: `Submit`,
		cancel: `Cancel`,
		close: `Close`,

		description: `is an Integrated Development Environment (IDE) specifically designed for data
		engineers and scientists working with large and complex data schemas. With DataStudio, you can
		easily create, visualize, and manipulate your data schemas, as well as export them in various formats
		for use in different environments and tools. It can also generate a test dataset based on the criteria
		of the schema.`,
		type_notfound: `Type not found`,
		type_create: `Create a type`,
		type_create_description: `You can create a new type by providing a name and selecting the nature of the new
		type.`,
		type_name: `Type Name`,
		type_isstruct: `Is this not an struct type ?`,
		type_isstruct_desc: `If you select this option, the type will be created as a concrete type (ex :
			String, Integer, Float, Boolean, Date)`,
		rename_title: 'Rename Element',
		rename_desc: `Rename the structure and click on save when you're done.`,
		rename_name: `Name`,
		elementdesc_title: `Field description`,
		elementdesc_desc: `Renseignez une description du champ`,
		elementdesc_name: `Description`,
		delete_title: `Are you absolutely sure?`,
		delete_desc: `				This action cannot be undone. This will permanently delete the element. Be carreful, this
		type might be used in different locations.`,
		structure_title: `Load a structure`,
		structure_desc: `Please pick a JSON DataStudio generated structure.`,
		structure_file: `File`,

		header_load: `Load a structure`,
		header_save: `Save the structure`,
		header_uml: `Export to UML Diagram`,
		header_xsd: `Export to XSD`,
		header_pyspark: `Export to PySpak`,
		header_scala: `Export to Scala`,
		header_test: `Generate test dataset`,
		header_sql: `Generate SQL structure query`,
		header_hql: `Generate HQL structure query`,
		header_md: `Generate Markdown array`,
		header_colors: `Change colors`,

		export_title: `Export`,
		export_desc: `Here you go !`
	},
	fr: {
		submit: `Submit`,
		cancel: `Cancel`,
		close: `Close`,

		description: `is an Integrated Development Environment (IDE) specifically designed for data
		engineers and scientists working with large and complex data schemas. With DataStudio, you can
		easily create, visualize, and manipulate your data schemas, as well as export them in various formats
		for use in different environments and tools. It can also generate a test dataset based on the criteria
		of the schema.`,
		type_notfound: `Type not found`,
		type_create: `Create a type`,
		type_create_description: `You can create a new type by providing a name and selecting the nature of the new
		type.`,
		type_name: `Type Name`,
		type_isstruct: `Is this not an struct type ?`,
		type_isstruct_desc: `If you select this option, the type will be created as a concrete type (ex :
			String, Integer, Float, Boolean, Date)`,
		rename_title: 'Rename Element',
		rename_desc: `Rename the structure and click on save when you're done.`,
		rename_name: `Name`,
		elementdesc_title: `Field description`,
		elementdesc_desc: `Renseignez une description du champ`,
		elementdesc_name: `Description`,
		delete_title: `Are you absolutely sure?`,
		delete_desc: `				This action cannot be undone. This will permanently delete the element. Be carreful, this
		type might be used in different locations.`,
		structure_title: `Load a structure`,
		structure_desc: `Please pick a JSON DataStudio generated structure.`,
		structure_file: `File`,

		header_load: `Load a structure`,
		header_save: `Save the structure`,
		header_uml: `Export to UML Diagram`,
		header_xsd: `Export to XSD`,
		header_pyspark: `Export to PySpak`,
		header_scala: `Export to Scala`,
		header_test: `Generate test dataset`,
		header_sql: `Generate SQL structure query`,
		header_hql: `Generate HQL structure query`,
		header_md: `Generate Markdown array`,
		header_colors: `Change colors`
	}
};

export default function t(key: string) {
	let locale;
	if (navigator.language === undefined) {
		locale = 'en';
	} else {
		locale = navigator.language.split('-')[0] || 'en';
	}
	return translations[locale][key] || key;
}
