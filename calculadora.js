//começo do projeto Class
/*caracteristicas que um objeto pode herdar, nada alem disso, a class só serve para */
class Calculator{
    //começo do constructor
    constructor(previousOperandTextElement, currentOperandTextElement){
        //CRIANDO VARIAVEIS de saida e entrada

        /*Função: pegar nossos elemento de texto anterior e atual e explicar
        aonde colocar nosso texto de exibição, no caso nele mesmo*/
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        
        /*Função:fazer os resultados atuais e anteriores serem uma 
        string vazia e os operandos ficarem indefinidos*/
        this.clear()
    }

    //function or methods
    clear() { //excluir tudo
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() { //excluir apenas um numero
        if (this.currentOperand.length > 0) {
            this.currentOperand = this.currentOperand.slice(0,-1)
        }
    }

    appendNumber(number) { //conectar com todos os numeros
        if(number === '.' && this.currentOperand.includes('.')) return //se digitado '.' e se a sequencia já presente inclui um ponto n funcionará 
        this.currentOperand = this.currentOperand.toString() + number.toString() //sempre que eu clico adiciona o um número
    }

    chooseOperation(operation) { //adicionar a operação
        if(this.currentOperand === '') return //só por garantia se tiver nada no elemento atual não funcionará
        if(this.previousOperand !== '') { //efetuará o calculo mesmo se tiver elemento antigo presente
            this.compute()
        }
        this.operation = operation //Informar qual operação precisa usar quando calcular o valor
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() { //computar as operações
        let computation //valor para enviar a resposta
        const prev = parseFloat(this.previousOperand) //transformar em número
        const current = parseFloat(this.currentOperand) //tranformar em número
        if (isNaN(prev) || isNaN(current)) return //Caso não tenha nada e clicar não aparecerá nada "prevenir"
        switch (this.operation) { //tipo um amontoado de if sem precisar escrever if
            //no caso case = if
            case '+':
                computation = prev + current 
                break //se fazer um apartir dele não faz todo o resto
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default: //responderia como um else
                return
        }
        this.currentOperand = computation
        this.operation = undefined /*limpar tudo quando clicar no igual e mostrar apenas o resultado*/
        this.previousOperand = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString
        const intergerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let intergerDisplay
        if (isNaN(intergerDigits)) {
            intergerDisplay = ''
        } else {
            intergerDisplay = intergerDigits.toLocaleString('en', {maximumFractionDigits: 0})
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return intergerDisplay
        }
    }

    updateDisplay() { //mudar o que estiver escrito na calculadora /e permitira definir o valor do texto lá encima
        this.currentOperandTextElement.innerText = this.currentOperand //mostra o current Operand na sua localização
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = 
                `${this.previousOperand} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]') //Fazendo váriaveis para efetuar a mecanica do site
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

//Dando uma class para o novo objeto "calculadora"
//Função: Pegar todas as váriaveis criadas e fazer-las funcionarem
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)//Passando tudo do constructor para o objeto

//Configurar os botões de números
numberButtons.forEach(button => { //forEach = "Para cada um"
    button.addEventListener('click', () => { // "quando clicar vai fazer =>"
        calculator.appendNumber(button.innerText) //registrar um numero
        calculator.updateDisplay() //aparecer no elemento 
    })
})

//Configurar os botões de operandos
operationButtons.forEach(button => { //forEach = "Para cada um"
    button.addEventListener('click', () => { // "quando clicar vai fazer =>"
        calculator.chooseOperation(button.innerText) //registrar um numero
        calculator.updateDisplay() //aparecer no elemento 
    })
})

//Configurando o botão de igual (=)
equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

//Configurando o botão limpar (EC)
allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

//Configurando o botão delet (DEL)
deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})