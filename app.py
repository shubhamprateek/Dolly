from flask import Flask, render_template, request, jsonify
import openpyxl

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api', methods=['POST'])
def api():
    data = request.get_json()
    input_data = data['input']
    result = input_data.upper()
    response = { 'result': result }
    return jsonify(response)

@app.route('/submit_prompt', methods=['POST'])
def submit_prompt():
    data = request.get_json()
    prompt = data['input']
    insert_prompt_into_excel(prompt)
    return 'Prompt Saved Successfully'

@app.route('/refresh_output', methods=['GET'])
def refresh_output():
    # Open the Excel file
    wb = openpyxl.load_workbook('example.xlsx')

    # Select the first worksheet
    ws = wb.active

    # Find the value in the most recent row of the "Output" column
    row_num = ws.max_row
    output = ws.cell(row=row_num, column=2).value

    return output

def insert_prompt_into_excel(prompt):
    # Open the Excel file
    wb = openpyxl.load_workbook('example.xlsx')

    # Select the first worksheet
    ws = wb.active

    prompt_cell = ws.cell(row=ws.max_row, column=1)
    prompt_cell.value = prompt

    # Save the changes to the Excel file
    wb.save('example.xlsx')


if __name__ == '__main__':
    app.run(debug=True)
