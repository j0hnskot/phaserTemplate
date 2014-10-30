/**
* @author     John Skotiniotis <j0hnskot@gmail.com>
*/
var Calc =function(game){
    this.game=game;


}



Calc.prototype ={






    calculate: function (expression) {
       // expression = '5+5+5*10+5';
        this.currentCalc=[];
        this.answers = [];
        this.orderOfAnswers = [];
        this.numbers = [];
        this.complete = false;
        this.results = [];
        this.results.push(expression);
        var i = 0;
        while (!this.complete) {

            if (i > expression.length - 1) {
                complete = true;
                return;
            }

            if (this.results[i].indexOf('(') != -1) {
                var firstPar = this.results[i].indexOf('(')

                var numbOfPar = 0;
                var endPar = this.results[i].indexOf(')', firstPar)
                while (this.results[i].indexOf('(', firstPar + 1) != -1 && this.results[i].indexOf('(', firstPar + 1) < endPar) {
                    firstPar = this.results[i].indexOf('(', firstPar + 1)
                    numbOfPar++;

                }


                if (this.results[i].slice(firstPar, endPar).indexOf('*') != -1 || this.results[i].slice(firstPar, endPar).indexOf('/') != -1 || this.results[i].slice(firstPar, endPar).indexOf('+') != -1 || this.results[i].slice(firstPar, endPar).indexOf('-') != -1) {


                    this.calcMultDiv(this.results, i, firstPar + 1, endPar)


                } else {

                    this.results[i]=(this.results[i].replace(this.results[i].substring(firstPar, endPar + 1), Parser.evaluate(this.results[i].substring(firstPar + 1, endPar))));
                    i--



                }





            } else {

                this.calcMultDiv(this.results, i)
            }




            i++


        }



    },




    calcMultDiv: function (results, i, zeroPoint, lastPoint) {


        if (typeof zeroPoint == 'undefined') {
              zeroPoint = 0;



        }

        if (typeof lastPoint == 'undefined') {
            lastPoint = this.results[i].length

        }






        if (this.results[i].slice(zeroPoint, lastPoint).indexOf('*') == -1 &&

            this.results[i].slice(zeroPoint, lastPoint).indexOf('/') == -1)


        {





            this.calcPlusMinus(this.results, i, zeroPoint,lastPoint)
            return

        }


        var currentCalc = '*';

        if (this.results[i].indexOf('/', zeroPoint) != -1 && this.results[i].indexOf('/', zeroPoint) < lastPoint) {
            currentCalc = '/';
            if (this.results[i].indexOf('*', zeroPoint) != -1 && this.results[i].indexOf('*', zeroPoint) < lastPoint) {

                if (this.results[i].indexOf('/', zeroPoint) > this.results[i].indexOf('*', zeroPoint)) {

                    currentCalc = '*';

                }


            }




        } else if (this.results[i].indexOf('*', zeroPoint) != -1) {
            currentCalc = '*';
            if (this.results[i].indexOf('/', zeroPoint) != -1) {

                if (this.results[i].indexOf('*', zeroPoint) > this.results[i].indexOf('/', zeroPoint)) {

                    currentCalc = '/';

                }


            }




        }







        var end = this.results[i].indexOf(currentCalc, zeroPoint) + 1
        this.orderOfAnswers.push(end - 1);
        this.currentCalc.push(currentCalc)
        var start = zeroPoint;



        for (var z = start; z < end - 1; z++) {

            if (this.results[i].slice(z, z + 1) == '+' || this.results[i].slice(z, z + 1) == '-' || this.results[i].slice(z, z + 1) == '*' || this.results[i].slice(z, z + 1) == '/')

            {

                start = z + 1;



            }

        }
          if(this.results[i].indexOf('-')==0 && 0==start)  end++;
        for (var e = end + 1; e < lastPoint; e++) {

            if (this.results[i].slice(e, e + 1) == '*' || this.results[i].slice(e, e + 1) == '/' || this.results[i].slice(e, e + 1) == '+' || this.results[i].slice(e, e + 1) == '-')

            {

                break


            } else {
                end++
            }



        }






        this.results.push(this.results[i].replace(this.results[i].substring(start, end + 1), Parser.evaluate(this.results[i].substring(start, end + 1))));
        this.answers.push(Parser.evaluate(this.results[i].substring(start, end + 1)));




    },



    calcPlusMinus: function (results, i, zeroPoint, lastPoint) {
        if (typeof zeroPoint == 'undefined') {
            zeroPoint = 0;

        }

        if (typeof lastPoint == 'undefined') {
            lastPoint = this.results[i].length


        }


        if (this.results[i].slice(zeroPoint, lastPoint).indexOf('+') == -1 &&

            this.results[i].slice(zeroPoint, lastPoint).indexOf('-') == -1) {

            this.complete = true;
            return;
        }
        var currentCalc = '+';

        if (this.results[i].indexOf('-', zeroPoint) != -1 && this.results[i].indexOf('-', zeroPoint) < lastPoint) {
            currentCalc = '-';
            if (this.results[i].indexOf('+', zeroPoint) != -1 && this.results[i].indexOf('+', zeroPoint) < lastPoint) {

                if (this.results[i].indexOf('-', zeroPoint) > this.results[i].indexOf('+', zeroPoint)) {

                    currentCalc = '+';

                }


            }



        } else if (this.results[i].indexOf('+', zeroPoint) != -1) {
            currentCalc = '+';
            if (this.results[i].indexOf('-', zeroPoint) != -1) {

                if (this.results[i].indexOf('+', zeroPoint) > this.results[i].indexOf('-', zeroPoint)) {

                    currentCalc = '-';

                }


            }




        }






        if(this.results[i].indexOf('-')==zeroPoint){


        }
        var end = this.results[i].indexOf(currentCalc, zeroPoint) + 1
          this.orderOfAnswers.push(end - 1);
          this.currentCalc.push(currentCalc)
        var start = zeroPoint;



        for (var z = start; z < end - 1; z++) {

            if (this.results[i].slice(z, z + 1) == '+' || this.results[i].slice(z, z + 1) == '-')

            {

                start = z + 1;


            }

        }

        for (var e = end + 1; e < lastPoint; e++) {

            if (this.results[i].slice(e, e + 1) == '+' || this.results[i].slice(e, e + 1) == '-')

            {

                break


            } else {
                end++
            }



        }






        this.results.push(this.results[i].replace(this.results[i].substring(start, end + 1), Parser.evaluate(this.results[i].substring(start, end + 1))));
        this.answers.push(Parser.evaluate(this.results[i].substring(start, end + 1)));



    },
}
