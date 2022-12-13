package interviewprograms;
public class ReverseNumber {
    public static void main(String[] args) {
        Integer number=12345;
        System.out.println("Original number(I): "+ number);
        String numberString=String.valueOf(number);
        String reverse="";
        for(int i=numberString.length()-1; i>=0; i--){
            reverse= reverse+numberString.charAt(i);
        }
        System.out.println("Reverse(I): "+ Integer.valueOf(reverse));
        
        System.out.println("Another Way-->");
        int num= 987654321, mod, rev=0;
        System.out.println("Original number(II): "+ num);
        while(num!=0){
            mod=num%10;
            rev=rev*10+mod;
            num=num/10;            
        }
        System.out.println("Reverse(II): "+ rev);
        
    }
}
