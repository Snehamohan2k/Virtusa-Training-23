package virtusatask;

import java.util.Scanner;
public class FloydsTriangle {
    
    public static void main(String[] args) {
        int in, r, c, num=1;
        
        Scanner sc= new Scanner(System.in);
        in= sc.nextInt();       
        
        System.out.println("Floyd's Triangle");
        
        for(r=1; r<=in; r++){    
            for(c=1; c<=r; c++)  
            {
                System.out.print(num+"  "); 
                num++;                      
            }
            System.out.println(" ");
        }
    }
    
}
