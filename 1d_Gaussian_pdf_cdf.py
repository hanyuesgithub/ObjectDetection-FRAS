import scipy.stats as stats

def calculate_cdf_value(interval, x):
    """
    计算给定区间和特定值的 CDF 值。
    
    参数:
    interval (tuple): 包含两个元素的元组，表示区间的起始和结束值 (min, max)。
    x (float): 需要计算CDF值的特定值。
    
    返回:
    float: 特定值 x 对应的 CDF 值。
    """
    # 确定区间的起始和结束值
    min_val, max_val = interval
    
    # 计算均值和标准差
    mu = (min_val + max_val) / 2
    sigma = (max_val - min_val) / 6
    
    # 计算 x 对应的 CDF 值
    cdf_value = stats.norm.cdf(x, mu, sigma)
    
    return cdf_value

# 示例使用
interval = (2, 6)
x = 2
cdf_value = calculate_cdf_value(interval, x)
print(f"The CDF value of x={x} in the interval {interval} is: {cdf_value:.4f}")
